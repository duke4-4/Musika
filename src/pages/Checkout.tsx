import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, Lock } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { createCheckoutSession } from "@/services/checkout";
import { getStripe } from "@/lib/stripe";
import { toast } from "sonner";

const checkoutSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone"),
  addressLine1: z.string().min(2, "Required"),
  addressLine2: z.string().optional().or(z.literal("")),
  city: z.string().min(2, "Required"),
  state: z.string().min(2, "Required"),
  postalCode: z.string().min(3, "Required"),
  country: z.string().min(2, "Required"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const inputClasses =
  "rounded-lg border border-accent bg-muted/70 focus:ring-2 ring-accent px-4 py-2 text-base transition shadow-sm placeholder:text-muted-foreground";
const labelClasses = "font-medium text-accent text-sm";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice } = useCart();
  const { profile, sessionToken, user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [prefilled, setPrefilled] = useState(false);

  const shipping = totalPrice > 100 ? 0 : 9.99;
  const tax = useMemo(() => Number((totalPrice * 0.08).toFixed(2)), [totalPrice]);
  const total = useMemo(() => Number((totalPrice + shipping + tax).toFixed(2)), [shipping, tax, totalPrice]);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: user?.email ?? "",
      phone: profile?.phone ?? "",
      addressLine1: profile?.address ?? "",
      addressLine2: "",
      city: profile?.city ?? "",
      state: profile?.state ?? "",
      postalCode: profile?.zip ?? "",
      country: "US",
    },
  });

  useEffect(() => {
    if (!items.length) {
      navigate("/cart");
    }
  }, [items.length, navigate]);

  useEffect(() => {
    if (prefilled) return;
    const hasProfileData = Boolean(profile || user?.email);
    if (!hasProfileData) return;
    const [first = "", ...rest] = (profile?.full_name ?? "").split(" ").filter(Boolean);
    form.reset({
      firstName: first || "",
      lastName: rest.join(" ") || "",
      email: user?.email ?? "",
      phone: profile?.phone ?? "",
      addressLine1: profile?.address ?? "",
      addressLine2: "",
      city: profile?.city ?? "",
      state: profile?.state ?? "",
      postalCode: profile?.zip ?? "",
      country: "US",
    });
    setPrefilled(true);
  }, [form, prefilled, profile, user?.email]);

  const onSubmit = async (values: CheckoutFormValues) => {
    if (!items.length) {
      toast.error("Your cart is empty.");
      return;
    }

    if (!sessionToken) {
      toast.error("Your session expired. Please sign in again.");
      navigate("/login");
      return;
    }

    setIsProcessing(true);
    try {
      const payload = {
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        customerEmail: values.email,
        shipping: {
          firstName: values.firstName,
          lastName: values.lastName,
          line1: values.addressLine1,
          line2: values.addressLine2,
          city: values.city,
          state: values.state,
          postalCode: values.postalCode,
          country: values.country.toUpperCase(),
          phone: values.phone,
        },
      };

      const { sessionId } = await createCheckoutSession(payload, sessionToken);
      const stripe = await getStripe();
      if (!stripe) {
        throw new Error("Stripe is not ready. Check your publishable key.");
      }
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        throw error;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to create Stripe session";
      toast.error(message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!items.length) {
    return null;
  }

  return (
    <Layout>
      <div className="container py-8 md:py-16 flex flex-col gap-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-accent mb-4">Secure Checkout</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-2xl bg-card/75 p-3 md:p-6 shadow-xl backdrop-blur-md">
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="flex flex-col gap-8">
                <section className="rounded-2xl border-2 border-accent bg-[rgba(255,255,255,0.95)] dark:bg-background p-6 shadow-lg">
                  <h2 className="text-xl font-bold mb-5 text-accent flex items-center gap-2">
                    <span className="h-3 w-3 bg-accent rounded-full mr-2" /> Contact Information
                  </h2>
                  <div className="space-y-5">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={labelClasses}>First Name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Jane" className={inputClasses} autoComplete="given-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={labelClasses}>Last Name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Doe" className={inputClasses} autoComplete="family-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClasses}>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                placeholder="you@example.com"
                                type="email"
                                autoComplete="email"
                                className={`${inputClasses} pr-10`}
                              />
                              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-accent pointer-events-none" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClasses}>Phone</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                placeholder="+1 (555) 000-0000"
                                type="tel"
                                autoComplete="tel"
                                className={`${inputClasses} pr-10`}
                              />
                              <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-accent pointer-events-none" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </section>

                <section className="rounded-2xl border-2 border-accent bg-[rgba(255,255,255,0.97)] dark:bg-background p-6 shadow-lg">
                  <h2 className="text-xl font-bold mb-5 text-accent flex items-center gap-2">
                    <span className="h-3 w-3 bg-accent rounded-full mr-2" />
                    Shipping Address
                  </h2>
                  <div className="space-y-5">
                    <FormField
                      control={form.control}
                      name="addressLine1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClasses}>Street Address</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="123 Main St" className={inputClasses} autoComplete="address-line1" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="addressLine2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClasses}>Apartment, suite (optional)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Apt 4B" className={inputClasses} autoComplete="address-line2" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid gap-5 sm:grid-cols-3">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={labelClasses}>City</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="New York" className={inputClasses} autoComplete="address-level2" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={labelClasses}>State</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="NY" className={inputClasses} autoComplete="address-level1" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={labelClasses}>ZIP</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="10001" className={inputClasses} autoComplete="postal-code" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClasses}>Country</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="US" className={inputClasses} autoComplete="country-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </section>

                <section className="rounded-2xl border-2 border-accent bg-[rgba(255,255,255,0.98)] dark:bg-background p-6 shadow-lg">
                  <h2 className="text-xl font-bold mb-5 text-accent flex items-center gap-2">
                    <span className="h-3 w-3 bg-accent rounded-full mr-2" /> Payment handled by Stripe
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    When you continue, we create a secure Stripe Checkout session in sandbox mode. Use{" "}
                    <span className="font-semibold">4242 4242 4242 4242</span> with any future expiry and CVC to test payments.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-accent border-t pt-3">
                    <Lock className="h-4 w-4 text-accent" />
                    <span>Your payment details never hit our servers.</span>
                  </div>
                </section>
              </div>

              <aside>
                <div className="rounded-2xl border-2 border-accent bg-gradient-to-b from-card/80 to-muted/80 p-6 sticky top-20 shadow-xl">
                  <h2 className="text-xl font-bold mb-5 text-accent">Order Summary</h2>
                  <div className="max-h-80 overflow-y-auto space-y-4 custom-scrollbar pr-1">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex gap-4 items-center bg-muted rounded-lg p-3 hover:scale-[1.01] transition shadow-sm border border-accent"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-14 w-14 rounded-md object-cover border border-accent"
                          loading="lazy"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-base text-accent line-clamp-1">{item.product.name}</p>
                          <p className="text-xs text-accent/80 mt-1">
                            Qty: <span className="font-medium">{item.quantity}</span>
                          </p>
                        </div>
                        <p className="font-semibold text-base text-right min-w-fit text-accent">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-5 bg-accent" />

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-accent/90">Subtotal</span>
                      <span className="font-medium text-accent">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-accent/90">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? (
                          <span className="text-green-600 dark:text-green-400">Free</span>
                        ) : (
                          <span className="text-accent">{`$${shipping.toFixed(2)}`}</span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-accent/90">Tax</span>
                      <span className="font-medium text-accent">${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator className="my-5 bg-accent" />

                  <div className="flex justify-between font-bold text-lg items-center">
                    <span className="text-accent">Total</span>
                    <span className="text-accent">${total.toFixed(2)}</span>
                  </div>

                  <Button
                    variant="accent"
                    size="lg"
                    className="w-full mt-8 text-lg py-3 rounded-xl tracking-wide font-semibold shadow-primary shadow-sm active:scale-98 transition"
                    type="submit"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Redirecting to Stripe..." : `Pay $${total.toFixed(2)}`}
                  </Button>
                </div>
              </aside>
            </div>
          </form>
        </Form>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e5e5;
          border-radius: 8px;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #e5e5e5 transparent;
        }
      `}</style>
    </Layout>
  );
};

export default Checkout;

