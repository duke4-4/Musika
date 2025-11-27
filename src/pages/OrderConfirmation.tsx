import { Link } from "react-router-dom";
import { CheckCircle, Package, Mail } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const OrderConfirmation = () => {
  const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}`;

  return (
    <Layout>
      <div className="container py-16">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
            <CheckCircle className="h-10 w-10 text-success" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight">Order Confirmed!</h1>
          <p className="mt-2 text-muted-foreground">
            Thank you for your purchase. Your order has been received.
          </p>

          <div className="mt-8 rounded-xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">Order Number</p>
            <p className="mt-1 text-xl font-semibold">{orderNumber}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg bg-secondary p-4">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div className="text-left">
                  <p className="text-sm font-medium">Confirmation Email</p>
                  <p className="text-xs text-muted-foreground">Sent to your inbox</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-secondary p-4">
                <Package className="h-5 w-5 text-muted-foreground" />
                <div className="text-left">
                  <p className="text-sm font-medium">Estimated Delivery</p>
                  <p className="text-xs text-muted-foreground">3-5 business days</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button variant="accent" asChild>
              <Link to="/orders">Track Order</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
