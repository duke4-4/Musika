import { Link } from "react-router-dom";
import { ShoppingBag, ShoppingCart, ArrowRight, Sparkles } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="min-h-[75vh] flex items-center justify-center relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-accent/5" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(120,119,198,0.08),transparent_50%)]" />

          <div className="container relative z-10 px-4 py-16">
            <div className="mx-auto max-w-2xl text-center">
              {/* Enhanced Empty State Icon */}
              <div className="relative mb-8">
                <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-secondary/50 via-secondary/30 to-accent/20 ring-2 ring-border/50 shadow-2xl backdrop-blur-sm">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground/70" />
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse" />
                <div className="absolute -bottom-3 -left-3 h-6 w-6 rounded-full bg-gradient-to-br from-accent/25 to-primary/15 animate-pulse [animation-delay:0.5s]" />
              </div>

              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent md:text-5xl">
                    Your Cart is Empty
                  </h1>
                  <p className="mt-4 text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
                    Looks like your shopping cart is taking a break! Discover amazing products and fill it up with items you'll love.
                  </p>
                </div>

                {/* Feature highlights */}
                <div className="grid gap-4 sm:grid-cols-3 max-w-xl mx-auto">
                  <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm font-medium">Premium Quality</p>
                  </div>
                  <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mx-auto mb-2">
                      <ShoppingCart className="h-4 w-4 text-accent" />
                    </div>
                    <p className="text-sm font-medium">Fast Shipping</p>
                  </div>
                  <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/10 flex items-center justify-center mx-auto mb-2">
                      <ArrowRight className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="text-sm font-medium">Easy Returns</p>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4">
                  <Button
                    variant="accent"
                    size="lg"
                    className="group text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-300"
                    asChild
                  >
                    <Link to="/products" className="flex items-center gap-3">
                      <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
                      Start Shopping
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 md:py-16 relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-transparent to-muted/10 -mx-4 rounded-3xl" />

        <div className="relative z-10">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Shopping Cart
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              {items.length} {items.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          {/* Cart Content */}
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-border/50 bg-gradient-to-b from-card/80 to-card/60 backdrop-blur-sm p-6 shadow-xl">
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div
                      key={item.product.id}
                      className="animate-in slide-in-from-left-5 duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CartItem item={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <CartSummary />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
