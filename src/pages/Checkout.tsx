import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Lock, Mail, Phone } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const inputBase =
  "rounded-lg border border-border bg-muted/70 focus:ring-2 ring-primary px-4 py-2 text-base transition shadow-sm placeholder:text-muted-foreground";
const labelBase = "font-medium text-muted-foreground text-sm";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const shipping = totalPrice > 100 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const total = totalPrice + shipping + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    clearCart();
    toast.success("Order placed successfully!");
    navigate("/order-confirmation");
    setIsProcessing(false);
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <Layout>
      <div className="container py-8 md:py-16 flex flex-col gap-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-primary mb-4">Checkout</h1>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-card/75 p-3 md:p-6 shadow-xl backdrop-blur-md"
        >
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Customer Information */}
            <div className="flex flex-col gap-8">
              {/* Contact Info */}
              <section className="rounded-2xl border-2 border-border bg-[rgba(255,255,255,0.95)] dark:bg-background p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-5 text-foreground flex items-center gap-2">
                  <span className="h-3 w-3 bg-primary rounded-full mr-2" /> Contact Information
                </h2>
                <div className="space-y-5">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="firstName" className={labelBase}>
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        required
                        placeholder="John"
                        className={inputBase}
                        autoComplete="given-name"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="lastName" className={labelBase}>
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        required
                        placeholder="Doe"
                        className={inputBase}
                        autoComplete="family-name"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 relative">
                    <Label htmlFor="email" className={labelBase}>
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      className={`${inputBase} pr-10`}
                      autoComplete="email"
                    />
                    <Mail className="absolute right-3 top-9 h-5 w-5 text-muted-foreground pointer-events-none" />
                  </div>
                  <div className="flex flex-col gap-2 relative">
                    <Label htmlFor="phone" className={labelBase}>
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      className={`${inputBase} pr-10`}
                      autoComplete="tel"
                    />
                    <Phone className="absolute right-3 top-9 h-5 w-5 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </section>

              {/* Shipping Address */}
              <section className="rounded-2xl border-2 border-border bg-[rgba(255,255,255,0.97)] dark:bg-background p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-5 text-foreground flex items-center gap-2">
                  <span className="h-3 w-3 bg-primary rounded-full mr-2" />
                  Shipping Address
                </h2>
                <div className="space-y-5">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="address" className={labelBase}>
                      Street Address
                    </Label>
                    <Input
                      id="address"
                      required
                      placeholder="123 Main St"
                      className={inputBase}
                      autoComplete="address-line1"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="apartment" className={labelBase}>
                      Apartment, suite, etc. (optional)
                    </Label>
                    <Input
                      id="apartment"
                      placeholder="Apt 4B"
                      className={inputBase}
                      autoComplete="address-line2"
                    />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-3">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="city" className={labelBase}>
                        City
                      </Label>
                      <Input
                        id="city"
                        required
                        placeholder="New York"
                        className={inputBase}
                        autoComplete="address-level2"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="state" className={labelBase}>
                        State
                      </Label>
                      <Input
                        id="state"
                        required
                        placeholder="NY"
                        className={inputBase}
                        autoComplete="address-level1"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="zip" className={labelBase}>
                        ZIP Code
                      </Label>
                      <Input
                        id="zip"
                        required
                        placeholder="10001"
                        className={inputBase}
                        autoComplete="postal-code"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Payment */}
              <section className="rounded-2xl border-2 border-border bg-[rgba(255,255,255,0.98)] dark:bg-background p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-5 text-foreground flex items-center gap-2">
                  <span className="h-3 w-3 bg-primary rounded-full mr-2" /> Payment Information
                </h2>
                <div className="space-y-5">
                  <div className="flex flex-col gap-2 relative">
                    <Label htmlFor="cardNumber" className={labelBase}>
                      Card Number
                    </Label>
                    <Input
                      id="cardNumber"
                      required
                      placeholder="4242 4242 4242 4242"
                      className={`${inputBase} pr-12 tracking-widest`}
                      autoComplete="cc-number"
                    />
                    <CreditCard className="absolute right-3 top-9 h-5 w-5 text-muted-foreground pointer-events-none" />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-3">
                    <div className="flex flex-col gap-2 sm:col-span-2">
                      <Label htmlFor="expiry" className={labelBase}>
                        Expiry Date
                      </Label>
                      <Input
                        id="expiry"
                        required
                        placeholder="MM/YY"
                        className={inputBase}
                        autoComplete="cc-exp"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="cvv" className={labelBase}>
                        CVV
                      </Label>
                      <Input
                        id="cvv"
                        required
                        placeholder="123"
                        className={inputBase}
                        autoComplete="cc-csc"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground border-t pt-3">
                  <Lock className="h-4 w-4" />
                  <span>
                    Your payment information is <span className="font-semibold text-primary">secure</span> &amp; encrypted
                  </span>
                </div>
              </section>
            </div>

            {/* Order Summary */}
            <aside>
              <div className="rounded-2xl border-2 border-border bg-gradient-to-b from-card/80 to-muted/80 p-6 sticky top-20 shadow-xl">
                <h2 className="text-xl font-bold mb-5 text-foreground">Order Summary</h2>
                <div className="max-h-80 overflow-y-auto space-y-4 custom-scrollbar pr-1">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 items-center bg-muted rounded-lg p-3 hover:scale-[1.01] transition shadow-sm"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-14 w-14 rounded-md object-cover border border-border"
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-base text-primary line-clamp-1">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Qty: <span className="font-medium">{item.quantity}</span>
                        </p>
                      </div>
                      <p className="font-semibold text-base text-right min-w-fit">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator className="my-5" />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600 dark:text-green-400">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator className="my-5" />

                <div className="flex justify-between font-bold text-lg items-center">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>

                <Button
                  variant="accent"
                  size="lg"
                  className="w-full mt-8 text-lg py-3 rounded-xl tracking-wide font-semibold shadow-primary shadow-sm active:scale-98 transition"
                  type="submit"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="animate-pulse">Processing...</span>
                  ) : (
                    `Pay $${total.toFixed(2)}`
                  )}
                </Button>
              </div>
            </aside>
          </div>
        </form>
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
