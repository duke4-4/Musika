import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { Search, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export const ProductGrid = ({
  products,
  isLoading = false,
  onLoadMore,
  hasMore = false
}: ProductGridProps) => {
  // Loading skeleton component
  const ProductCardSkeleton = () => (
    <div className="group relative flex flex-col overflow-hidden rounded-xl bg-card border border-border/50 p-4 animate-pulse">
      <div className="aspect-square overflow-hidden rounded-lg bg-secondary mb-4">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="flex flex-1 flex-col space-y-3">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="mt-auto pt-4 flex items-center justify-between">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-secondary to-secondary/50 rounded-full flex items-center justify-center">
          <Package className="h-12 w-12 text-muted-foreground" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
          <Search className="h-4 w-4 text-primary-foreground" />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-foreground mb-2">
        No products found
      </h3>
      <p className="text-muted-foreground mb-8 max-w-md leading-relaxed">
        We couldn't find any products matching your criteria. Try adjusting your filters,
        search query, or browse our complete collection.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          className="group hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
        >
          <Search className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
          Clear Filters
        </Button>
        <Button
          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
        >
          Browse All Products
        </Button>
      </div>
    </div>
  );

  // Loading state
  if (isLoading && products.length === 0) {
    return (
      <div className="space-y-8">
        {/* Loading header */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Loading grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty state
  if (!isLoading && products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-8">
      {/* Product count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {isLoading ? (
            <Skeleton className="h-5 w-32" />
          ) : (
            `Showing ${products.length} product${products.length !== 1 ? 's' : ''}`
          )}
        </p>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={cn(
              "animate-fade-in-up group",
              "hover:scale-[1.02] transition-all duration-300"
            )}
            style={{ animationDelay: `${Math.min(index * 100, 800)}ms` }}
          >
            {/* Hover glow effect */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              <ProductCard product={product} />
            </div>
          </div>
        ))}

        {/* Loading more skeletons */}
        {isLoading && hasMore && (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`loading-${index}`}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCardSkeleton />
              </div>
            ))}
          </>
        )}
      </div>

      {/* Load more button */}
      {hasMore && !isLoading && onLoadMore && (
        <div className="flex justify-center pt-8">
          <Button
            onClick={onLoadMore}
            variant="outline"
            size="lg"
            className="group hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 px-8"
          >
            <Package className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
            Load More Products
          </Button>
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && hasMore && (
        <div className="flex justify-center py-8">
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            <span className="text-sm">Loading more products...</span>
          </div>
        </div>
      )}
    </div>
  );
};
