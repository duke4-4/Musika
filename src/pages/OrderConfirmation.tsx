import { Link } from "react-router-dom";
import { CheckCircle, Package, Mail, Truck, Clock, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Use this color for the "accent" variant in the UI
const ACCENT_COLOR = "#10B981"; // emerald-500 (tailwind)

const OrderConfirmation = () => {
  const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}`;

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-green-500/5 to-emerald-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.05),transparent_50%)]" />

        <div className="container relative z-10 px-4 py-16">
          <div className="mx-auto max-w-2xl">
            {/* Success Animation */}
            <div className="text-center mb-12">
              <div className="relative mb-8">
                <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-green-500/20 ring-4 ring-green-500/20 shadow-2xl animate-in zoom-in-50 duration-500">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                    <CheckCircle className="h-12 w-12 text-white animate-in spin-in-180 duration-300 delay-200" />
                  </div>
                </div>

                {/* Floating particles */}
                <div className="absolute -top-2 -left-8 h-4 w-4 rounded-full bg-green-500/30 animate-bounce [animation-delay:0.5s]" />
                <div className="absolute -top-4 -right-4 h-6 w-6 rounded-full bg-emerald-500/20 animate-bounce [animation-delay:1s]" />
                <div className="absolute -bottom-6 left-12 h-5 w-5 rounded-full bg-green-500/25 animate-bounce [animation-delay:0.8s]" />
                <div className="absolute -bottom-2 right-8 h-3 w-3 rounded-full bg-emerald-500/30 animate-bounce [animation-delay:1.2s]" />
              </div>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-green-600 via-emerald-600 to-green-500 bg-clip-text text-transparent mb-4">
                Order Confirmed!
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
                Thank you for your purchase! Your order has been successfully placed and is being processed.
              </p>
            </div>

            {/* Order Details Card */}
            <div className="bg-gradient-to-b from-card/80 to-card/60 backdrop-blur-md rounded-3xl border border-border/50 shadow-2xl p-8 mb-8 animate-in slide-in-from-bottom-5 duration-500 delay-300">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <Sparkles className="h-4 w-4" />
                  Order #{orderNumber}
                </div>
                <p className="text-muted-foreground">
                  We've sent the confirmation details to your email
                </p>
              </div>

              <Separator className="my-6" />

              {/* Order Status Cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/20 p-5 transition-all hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">Confirmation Email</p>
                    <p className="text-sm text-muted-foreground">Sent to your inbox</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20 p-5 transition-all hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10">
                    <Package className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">Order Processing</p>
                    <p className="text-sm text-muted-foreground">Started immediately</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-purple-500/5 border border-purple-500/20 p-5 transition-all hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10">
                    <Truck className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">Estimated Delivery</p>
                    <p className="text-sm text-muted-foreground">3-5 business days</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/20 p-5 transition-all hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">Track Your Order</p>
                    <p className="text-sm text-muted-foreground">Real-time updates</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center animate-in slide-in-from-bottom-5 duration-500 delay-500">
              <Button
                variant="accent"
                size="lg"
                className="group text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: ACCENT_COLOR, color: "#fff", borderColor: ACCENT_COLOR }}
                asChild
              >
                <Link to="/orders" className="flex items-center gap-3">
                  <Package className="h-5 w-5 transition-transform group-hover:scale-110" />
                  Track Order
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 h-auto border-2 hover:border-primary/50 transition-all duration-300"
                asChild
              >
                <Link to="/products" className="flex items-center gap-3">
                  <ShoppingBag className="h-5 w-5" />
                  Continue Shopping
                </Link>
              </Button>
            </div>

            {/* Additional Info */}
            <div className="text-center mt-8 pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-4">
                Need help with your order?
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Link
                  to="/account"
                  className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
                >
                  View Order History
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link
                  to="/contact"
                  className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
                >
                  Contact Support
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link
                  to="/faq"
                  className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
                >
                  FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
