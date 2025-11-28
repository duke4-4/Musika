import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import type { Order } from "@/types/order";

const fetchOrders = async (userId: string): Promise<Order[]> => {
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*, products(name, image))")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (
    data?.map((order: any) => ({
      ...order,
      items:
        order.order_items?.map((item: any) => ({
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
    })) ?? []
  );
};

export const useOrders = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: () => fetchOrders(user!.id),
    enabled: Boolean(user?.id),
    staleTime: 30_000,
  });

  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel(`orders:user:${user.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders", filter: `user_id=eq.${user.id}` },
        () => {
          queryClient.invalidateQueries({ queryKey: ["orders", user.id] }).catch((err) => {
            console.error("Failed to refresh orders", err);
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, user?.id]);

  return query;
};

