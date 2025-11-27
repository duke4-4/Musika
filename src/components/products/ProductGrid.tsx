import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid = ({ products }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-lg text-muted-foreground">No products found</p>
        <p className="text-sm text-muted-foreground mt-1">
          Try adjusting your filters or search query
        </p>
        {/* "Shop Now" button using accent variant for better UI */}
        <Button variant="accent" className="mt-6 rounded-full px-7 py-3 text-base font-semibold shadow-lg" asChild>
          <a href="/products">Shop All Products</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {/* Optionally, you could pass accent-related props to ProductCard if needed */}
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};
