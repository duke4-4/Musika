import { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle, Package, Mail, Truck, Clock, ShoppingBag, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Order, OrderItem } from "@/types/order";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/contexts/CartContext";

type OrderWithItems = Order & { items: OrderItem[] };

const statusCopy = {
  pending_payment: "Pending payment confirmation",
  paid: "Payment captured",
  processing: "Preparing your items",
  shipped: "On its way",
  delivered: "Delivered",
  cancelled: "Order cancelled",
};

const fetchOrderBySession = async (sessionId: string): Promise<OrderWithItems> => {
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*, products(name, image))")
    .eq("stripe_session_id", sessionId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    ...data,
    items:
      data.order_items?.map((item: any) => ({
        id: item.id,
        order_id: item.order_id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        product: item.products
          ? {
              name: item.products.name,
              image: item.products.image,
            }
          : undefined,
      })) ?? [],
  };
};

const statusSteps: Order["status"][] = ["pending_payment", "paid", "processing", "shipped", "delivered"];

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();
  const clearedRef = useRef(false);

  const { data: order, isLoading, isError } = useQuery({
    queryKey: ["order-confirmation", sessionId],
    queryFn: () => fetchOrderBySession(sessionId!),
    enabled: Boolean(sessionId),
    staleTime: 0,
  });

  useEffect(() => {
    if (order && order.status !== "pending_payment" && !clearedRef.current) {
      clearCart();
      clearedRef.current = true;
    }
  }, [clearCart, order]);

  if (!sessionId) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 text-center">
          <p className="text-2xl font-bold">No session detected</p>
          <p className="text-muted-foreground max-w-md">
            We could not find a Stripe checkout session. Please return to your orders page or try finishing checkout again.
          </p>
          <Button variant="accent" asChild>
            <Link to="/orders">Go to Orders</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-center">
          <Loader2 className="h-10 w-10 text-accent animate-spin" />
          <p className="text-muted-foreground">Checking your order...</p>
        </div>
      </Layout>
    );
  }

  if (isError || !order) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 text-center">
          <p className="text-2xl font-bold">We can't find that order</p>
          <p className="text-muted-foreground max-w-md">
            The checkout session finished, but we couldn't load order details. Please refresh or check your orders dashboard.
          </p>
          <Button variant="accent" asChild>
            <Link to="/orders">Open orders dashboard</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const amountTotal = (order.amount_total / 100).toLocaleString(undefined, {
    style: "currency",
    currency: order.currency || "USD",
  });
  const statusIndex = Math.max(statusSteps.indexOf(order.status), 0);

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-green-500/5 to-emerald-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.05),transparent_50%)]" />

        <div className="container relative z-10 px-4 py-16">
          <div className="mx-auto max-w-3xl space-y-10">
            <div className="text-center">
              <div className="relative mb-8">
                <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-green-500/20 ring-4 ring-green-500/20 shadow-2xl">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                    <CheckCircle className="h-12 w-12 text-white" />
                  </div>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-green-600 via-emerald-600 to-green-500 bg-clip-text text-transparent mb-4">
                Order confirmed!
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Thanks for shopping with Musika. We’re processing your payment and will keep you updated every step of the way.
              </p>
            </div>

            <div className="bg-gradient-to-b from-card/80 to-card/60 backdrop-blur-md rounded-3xl border border-border/50 shadow-2xl p-8 space-y-6">
              <div className="text-center space-y-3">
                <Badge variant="accent" className="inline-flex items-center gap-2 px-4 py-2 rounded-full">
                  <Sparkles className="h-4 w-4" />
                  Order #{order.id.slice(0, 8).toUpperCase()}
                </Badge>
                <p className="text-muted-foreground">
                  Confirmation sent to <span className="font-semibold">{order.shipping_address?.full_name ?? "you"}</span>
                </p>
                <p className="text-3xl font-bold text-foreground">{amountTotal}</p>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/20 p-5 transition-all hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">Confirmation Email</p>
                    <p className="text-sm text-muted-foreground">Sent to {order.shipping_address?.full_name ?? "you"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20 p-5 transition-all hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10">
                    <Package className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">Current Status</p>
                    <p className="text-sm text-muted-foreground">{statusCopy[order.status]}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-purple-500/5 border border-purple-500/20 p-5 transition-all hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10">
                    <Truck className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">Shipping to</p>
                    <p className="text-sm text-muted-foreground">
                      {order.shipping_address?.line1}
                      {order.shipping_address?.line2 ? `, ${order.shipping_address?.line2}` : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/20 p-5 transition-all hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">Live Tracking</p>
                    <p className="text-sm text-muted-foreground">Updates posted in your dashboard</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <p className="text-sm font-semibold text-muted-foreground">Timeline</p>
                <div className="flex flex-col gap-4">
                  {statusSteps.map((step, idx) => {
                    const reached = statusIndex >= idx || order.status === "delivered";
                    return (
                      <div key={step} className="flex items-center gap-4">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                            reached ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground"
                          }`}
                        >
                          {idx + 1}
                        </div>
                        <div>
                          <p className="font-semibold capitalize">{step.replace("_", " ")}</p>
                          <p className="text-sm text-muted-foreground">{statusCopy[step] ?? ""}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-4">Items in this order</p>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      {item.product?.image ? (
                        <img src={item.product.image} alt={item.product.name} className="h-16 w-16 rounded-xl object-cover border" />
                      ) : (
                        <div className="h-16 w-16 rounded-xl bg-muted border" />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold">{item.product?.name ?? "Product"}</p>
                        <p className="text-sm text-muted-foreground">Qty {item.quantity}</p>
                      </div>
                      <p className="font-semibold">
                        {(item.unit_price / 100).toLocaleString(undefined, { style: "currency", currency: order.currency || "USD" })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button variant="accent" size="lg" className="group text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                <Link to="/orders" className="flex items-center gap-3">
                  <Package className="h-5 w-5 transition-transform group-hover:scale-110" />
                  Track Order
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto border-2 hover:border-primary/50 transition-all duration-300" asChild>
                <Link to="/products" className="flex items-center gap-3">
                  <ShoppingBag className="h-5 w-5" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
