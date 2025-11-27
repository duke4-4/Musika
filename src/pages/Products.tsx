import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Package, Sparkles, TrendingUp } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductFilters } from "@/components/products/ProductFilters";
import { products } from "@/data/products";
import { FilterState, SortOption } from "@/types/product";
import { Badge } from "@/components/ui/badge";

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [filters, setFilters] = useState<FilterState>({
    category: categoryParam,
    minPrice: 0,
    maxPrice: 1000,
    search: "",
  });
  const [sortOption, setSortOption] = useState<SortOption>("rating");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply filters
    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
      );
    }
    if (filters.minPrice > 0) {
      result = result.filter((p) => p.price >= filters.minPrice);
    }
    if (filters.maxPrice < 1000) {
      result = result.filter((p) => p.price <= filters.maxPrice);
    }

    // Apply sorting
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [filters, sortOption]);

  const totalProducts = products.length;
  const showingCount = filteredProducts.length;

  return (
    <Layout>
      <div className="min-h-screen relative">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/10 to-primary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(120,119,198,0.05),transparent_50%)]" />

        <div className="container relative z-10 py-8 md:py-16">
          {/* Enhanced Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shadow-lg">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                  All Products
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant="secondary" className="text-sm">
                    <Sparkles className="h-3 w-3 mr-1" />
                    {totalProducts} Products Available
                  </Badge>
                  {showingCount !== totalProducts && (
                    <Badge variant="outline" className="text-sm">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Showing {showingCount}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Discover our complete collection of premium products. From cutting-edge technology to timeless classics,
              find exactly what you're looking for with our advanced filtering options.
            </p>
          </div>

          {/* Filters Section */}
          <div className="mb-8">
            <ProductFilters
              filters={filters}
              sortOption={sortOption}
              onFiltersChange={setFilters}
              onSortChange={setSortOption}
            />
          </div>

          {/* Products Grid */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border/5 to-transparent rounded-3xl -mx-4" />
            <div className="relative bg-card/30 backdrop-blur-sm rounded-2xl border border-border/50 p-6 md:p-8 shadow-xl">
              <ProductGrid products={filteredProducts} />
            </div>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-muted/50 to-muted/30 mb-6">
                <Package className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Try adjusting your filters or search terms to find what you're looking for.
              </p>
              <button
                onClick={() => setFilters({
                  category: null,
                  minPrice: 0,
                  maxPrice: 1000,
                  search: "",
                })}
                className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
