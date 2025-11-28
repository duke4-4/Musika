import "dotenv/config";
import express from "express";
import cors from "cors";
import Stripe from "stripe";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import type { Request } from "express";

export const app = express();
const PORT = Number(process.env.PORT ?? 4000);
const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const resendKey = process.env.RESEND_API_KEY;
const resendFrom = process.env.RESEND_FROM_EMAIL;
const supabaseUrl = process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const appUrl = process.env.VITE_APP_URL ?? process.env.APP_URL ?? "http://localhost:5173";

if (!stripeSecret || !stripeWebhookSecret || !supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing required environment variables for Stripe or Supabase.");
}

if (!resendKey || !resendFrom) {
  console.warn("Resend credentials missing. Order emails will be skipped.");
}

const stripe = new Stripe(stripeSecret, { apiVersion: "2024-06-20" });
const resend = resendKey ? new Resend(resendKey) : null;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const allowedOrigins =
  process.env.CLIENT_URL?.split(",")
    .map((url) => url.trim())
    .filter(Boolean) ?? [appUrl];

app.use(cors({ origin: allowedOrigins }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.post("/api/webhooks/stripe", express.raw({ type: "application/json" }), async (req, res) => {
  const signature = req.headers["stripe-signature"];

  if (!signature) {
    return res.status(400).send("Missing Stripe signature");
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, signature, stripeWebhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown webhook error";
    return res.status(400).send(`Webhook Error: ${message}`);
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const orderId = session.metadata?.order_id;

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        if (orderId) {
          await supabase
            .from("orders")
            .update({
              status: "paid",
              payment_intent: session.payment_intent?.toString(),
              stripe_session_id: session.id,
              updated_at: new Date().toISOString(),
            })
            .eq("id", orderId);

          if (resend && resendFrom) {
            const to = session.customer_details?.email ?? session.customer_email;
            if (to) {
              await resend.emails.send({
                from: resendFrom,
                to,
                subject: `Your Musika order ${orderId} is confirmed`,
                html: `
                  <h2>Thanks for your purchase!</h2>
                  <p>Your order <strong>${orderId}</strong> has been confirmed. We'll notify you again once it's on the way.</p>
                  <p>Need anything? Just reply to this email.</p>
                `,
              });
            }
          }
        }
        break;
      }
      case "checkout.session.async_payment_failed": {
        if (orderId) {
          await supabase
            .from("orders")
            .update({
              status: "cancelled",
              updated_at: new Date().toISOString(),
            })
            .eq("id", orderId);
        }
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.error("Webhook processing error:", error);
    return res.status(500).send("Webhook handler failed");
  }

  res.json({ received: true });
});

app.use(express.json());

const authenticate = async (req: Request) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    throw new Error("Missing authorization token");
  }
  const token = header.replace("Bearer ", "");
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    throw new Error("Invalid or expired session");
  }

  return user;
};

app.post("/api/checkout/session", async (req, res) => {
  try {
    const user = await authenticate(req);
    const { items, shipping, customerEmail } = req.body ?? {};

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Cart items are required" });
    }

    if (!shipping || !customerEmail) {
      return res.status(400).json({ message: "Shipping information and email are required" });
    }

    const productIds = items.map((item: { productId: string }) => item.productId);
    const { data: productRows, error: productError } = await supabase
      .from("products")
      .select("*")
      .in("id", productIds);

    if (productError || !productRows?.length) {
      return res.status(400).json({ message: "Products not found" });
    }

    const productsById = Object.fromEntries(productRows.map((p: any) => [p.id, p]));

    const lineItems = items.map((item: { productId: string; quantity: number }) => {
      const product = productsById[item.productId];
      if (!product) {
        throw new Error(`Product ${item.productId} not available`);
      }
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: product.image ? [product.image] : undefined,
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: item.quantity,
      } satisfies Stripe.Checkout.SessionCreateParams.LineItem;
    });

    const subtotal = lineItems.reduce((sum, item) => sum + (item.price_data?.unit_amount ?? 0) * (item.quantity ?? 1), 0);
    const shippingFee = subtotal > 10000 ? 0 : 999;
    const tax = Math.round(subtotal * 0.08);
    const total = subtotal + shippingFee + tax;

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        status: "pending_payment",
        amount_subtotal: subtotal,
        amount_total: total,
        currency: "usd",
        shipping_address: {
          full_name: `${shipping.firstName} ${shipping.lastName}`.trim(),
          line1: shipping.line1,
          line2: shipping.line2,
          city: shipping.city,
          state: shipping.state,
          postal_code: shipping.postalCode,
          country: shipping.country,
          phone: shipping.phone,
        },
      })
      .select()
      .single();

    if (orderError || !order) {
      throw new Error(orderError?.message ?? "Unable to create order record");
    }

    const orderItems = items.map((item: { productId: string; quantity: number }) => {
      const product = productsById[item.productId];
      return {
        order_id: order.id,
        product_id: product.id,
        quantity: item.quantity,
        unit_price: Math.round(product.price * 100),
      };
    });

    await supabase.from("order_items").insert(orderItems);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: customerEmail,
      success_url: `${appUrl}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/cart`,
      metadata: {
        order_id: order.id,
        user_id: user.id,
      },
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      line_items: lineItems,
      automatic_tax: { enabled: false },
      allow_promotion_codes: true,
    });

    await supabase
      .from("orders")
      .update({
        stripe_session_id: session.id,
      })
      .eq("id", order.id);

    res.json({ sessionId: session.id, orderId: order.id });
  } catch (error) {
    console.error("Checkout session error:", error);
    const message = error instanceof Error ? error.message : "Unable to start checkout";
    res.status(400).json({ message });
  }
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`API server ready on http://localhost:${PORT}`);
  });
}

