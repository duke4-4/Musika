import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Separator } from "@/components/ui/separator";

export const CartSummary = () => {
  const { totalPrice, totalItems } = useCart();
  const shipping = totalPrice > 100 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const total = totalPrice + shipping + tax;

  return (
    <div className="rounded-xl border border-border bg-card p-6 card-shadow">
      <h2 className="text-lg font-semibold">Order Summary</h2>
      
      <div className="mt-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Estimated Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span className="text-price">${total.toFixed(2)}</span>
      </div>

      {totalPrice < 100 && (
        <p className="mt-3 text-xs text-muted-foreground text-center">
          Add ${(100 - totalPrice).toFixed(2)} more for free shipping
        </p>
      )}

      <Button variant="accent" className="w-full mt-6" size="lg" asChild>
        <Link to="/checkout">Proceed to Checkout</Link>
      </Button>

      <Button variant="outline" className="w-full mt-3" asChild>
        <Link to="/products">Continue Shopping</Link>
      </Button>
    </div>
  );
};
