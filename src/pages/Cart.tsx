import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
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
        <div className="container py-16">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-secondary p-6 mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold">Your shopping cart is empty</h1>
            <p className="mt-2 text-muted-foreground max-w-md">
              Looks like you haven't added anything to your shopping cart yet. Start shopping to fill it up!
            </p>
            <Button variant="accent" className="mt-6" asChild>
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
        <p className="mt-2 text-muted-foreground">
          {items.length} {items.length === 1 ? "item" : "items"} in your cart
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-card p-6">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          </div>

          <div>
            <CartSummary />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
