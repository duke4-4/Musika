import { format } from "date-fns";
import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useOrders } from "@/hooks/useOrders";
import type { OrderStatus } from "@/types/order";
import { Loader2, PackageCheck, RefreshCcw, Truck, Wallet } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const statusMap: Record<
  OrderStatus,
  { label: string; description: string; icon: React.ReactNode; accent: string }
> = {
  pending_payment: {
    label: "Pending Payment",
    description: "Waiting for Stripe confirmation",
    icon: <Wallet className="h-4 w-4" />,
    accent: "bg-amber-500/15 text-amber-600",
  },
  paid: {
    label: "Paid",
    description: "Payment captured successfully",
    icon: <PackageCheck className="h-4 w-4" />,
    accent: "bg-green-500/15 text-green-600",
  },
  processing: {
    label: "Processing",
    description: "Preparing your order",
    icon: <RefreshCcw className="h-4 w-4" />,
    accent: "bg-blue-500/15 text-blue-600",
  },
  shipped: {
    label: "Shipped",
    description: "On its way to you",
    icon: <Truck className="h-4 w-4" />,
    accent: "bg-purple-500/15 text-purple-600",
  },
  delivered: {
    label: "Delivered",
    description: "Delivered successfully",
    icon: <PackageCheck className="h-4 w-4" />,
    accent: "bg-emerald-500/15 text-emerald-600",
  },
  cancelled: {
    label: "Cancelled",
    description: "Order was cancelled",
    icon: <RefreshCcw className="h-4 w-4" />,
    accent: "bg-red-500/15 text-red-600",
  },
};

const statusSteps: OrderStatus[] = ["pending_payment", "paid", "processing", "shipped", "delivered"];

const Orders = () => {
  const { data: orders, isLoading, refetch, isFetching } = useOrders();
  const queryClient = useQueryClient();

  const handleManualRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ["orders"] });
    refetch();
  };

  return (
    <Layout>
      <div className="container py-10 space-y-8">
        <div className="flex flex-col gap-4">
          <p className="text-sm uppercase tracking-widest text-accent font-semibold">Order tracking</p>
          <h1 className="text-4xl font-black tracking-tight">Stay in sync with every status update</h1>
          <p className="max-w-2xl text-muted-foreground">
            Powered by Supabase Realtime and Stripe webhooks. As soon as an order is placed, you'll watch it move from
            checkout to delivery without refreshing the page.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="accent" className="h-8 rounded-full px-4">
            Live updates on
          </Badge>
          <Button variant="outline" disabled={isFetching} onClick={handleManualRefresh} className="gap-2">
            {isFetching ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Syncing
              </>
            ) : (
              <>
                <RefreshCcw className="h-4 w-4" />
                Refresh
              </>
            )}
          </Button>
        </div>

        {isLoading ? (
          <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4 text-center">
            <Loader2 className="h-10 w-10 animate-spin text-accent" />
            <p className="text-muted-foreground">Fetching your latest orders…</p>
          </div>
        ) : orders && orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => {
              const statusIndex = Math.max(statusSteps.indexOf(order.status), 0);
              return (
                <Card key={order.id} className="border border-border/60 shadow-xl">
                  <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold">Order #{order.id.slice(0, 8).toUpperCase()}</CardTitle>
                      <CardDescription>
                        Placed {format(new Date(order.created_at), "MMM d, yyyy • h:mm a")}
                      </CardDescription>
                    </div>
                    <Badge className={`gap-2 ${statusMap[order.status].accent}`}>
                      {statusMap[order.status].icon}
                      {statusMap[order.status].label}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Total</p>
                        <p className="text-2xl font-bold">
                          {(order.amount_total / 100).toLocaleString(undefined, {
                            style: "currency",
                            currency: order.currency || "USD",
                          })}
                        </p>
                      </div>
                      {order.shipping_address ? (
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Shipping to</p>
                          <p className="font-semibold">{order.shipping_address.full_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.shipping_address.line1}
                            {order.shipping_address.line2 ? `, ${order.shipping_address.line2}` : ""}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code}
                          </p>
                        </div>
                      ) : null}
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm font-semibold text-muted-foreground">Timeline</p>
                      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:gap-0 md:justify-between">
                        {statusSteps.map((step, idx) => {
                          const reached = statusIndex >= idx || order.status === "delivered";
                          return (
                            <div key={step} className="flex items-center gap-3 md:flex-col md:text-center relative">
                              {idx !== 0 && (
                                <div
                                  className={`absolute md:left-1/2 md:-translate-x-1/2 md:top-8 md:w-0.5 md:h-12 ${
                                    reached ? "bg-accent" : "bg-border"
                                  } hidden md:block`}
                                />
                              )}
                              <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                                  reached ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground"
                                }`}
                              >
                                {statusMap[step].icon}
                              </div>
                              <div className="md:mt-3">
                                <p className="text-sm font-semibold">{statusMap[step].label}</p>
                                <p className="text-xs text-muted-foreground">{statusMap[step].description}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-4">Items</p>
                      <div className="space-y-4">
                        {order.items?.map((item) => (
                          <div key={item.id} className="flex items-center gap-4">
                            {item.product?.image ? (
                              <img
                                src={item.product.image}
                                alt={item.product?.name}
                                className="h-16 w-16 rounded-xl border object-cover"
                                loading="lazy"
                              />
                            ) : (
                              <div className="h-16 w-16 rounded-xl border bg-muted" />
                            )}
                            <div className="flex-1">
                              <p className="font-semibold">{item.product?.name ?? "Product"}</p>
                              <p className="text-sm text-muted-foreground">Qty {item.quantity}</p>
                            </div>
                            <p className="font-semibold">
                              {(item.unit_price / 100).toLocaleString(undefined, { style: "currency", currency: "USD" })}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="min-h-[40vh] flex flex-col items-center justify-center gap-6 text-center border border-dashed border-border rounded-3xl p-10">
            <img
              src="https://illustrations.popsy.co/gray/shopping-04.svg"
              alt="No orders"
              className="h-36 opacity-80"
              draggable={false}
            />
            <div className="space-y-3">
              <h2 className="text-2xl font-bold">No orders yet</h2>
              <p className="text-muted-foreground">
                Your future purchases will show up here instantly after checkout.
              </p>
            </div>
            <Button variant="accent" asChild>
              <a href="/products">Browse products</a>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Orders;

