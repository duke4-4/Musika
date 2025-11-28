import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/types/product";
import { products as fallbackProducts } from "@/data/products";

const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: true });

  if (error) {
    console.warn("Falling back to static products due to Supabase error:", error.message);
    return fallbackProducts;
  }

  return data?.length ? data : fallbackProducts;
};

export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    initialData: fallbackProducts,
    staleTime: 60_000,
  });

