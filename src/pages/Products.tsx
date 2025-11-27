import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductFilters } from "@/components/products/ProductFilters";
import { products } from "@/data/products";
import { FilterState, SortOption } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Sparkles, Layers, Filter, ShoppingBag, RotateCcw } from "lucide-react";

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

  return (
    <Layout>
      {/* HERO HEADER */}
      <section className="container px-0 pb-0 ">
        <div className="relative rounded-xl overflow-hidden shadow-lg isolate bg-gradient-to-tr from-primary/30 via-accent/10 to-card/80 animate-fade-in">
          <div className="absolute inset-0 bg-grid-slate-700/10 dark:bg-grid-slate-100/5 pointer-events-none z-0" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-end gap-8 p-8 md:px-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-3 py-1 px-3 mb-5 rounded-full bg-primary/10 backdrop-blur-md shadow-inner">
                <Sparkles className="h-6 w-6 text-primary animate-pulse" />
                <span className="uppercase text-xs tracking-widest font-semibold text-primary">Shop Now</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-primary via-accent to-foreground bg-clip-text text-transparent mb-2">
                All Products
              </h1>
              <p className="text-muted-foreground/80 mt-3 max-w-lg text-base md:text-lg">
                {/* More dynamic for touch of modern: */}
                Discover <span className="font-bold text-accent">{filteredProducts.length}</span> {filteredProducts.length === 1 ? "product" : "products"} you’ll love. Filter, sort, and shop our most wanted picks!
              </p>
              <div className="flex mt-7 gap-3 flex-wrap">
                <Button
                  variant="secondary"
                  size="lg"
                  className="flex items-center gap-2 rounded-full bg-gradient-to-br from-accent to-primary/70 text-primary-foreground shadow-lg shadow-primary/10 hover:scale-105 transition-transform"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Bestsellers
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="flex items-center gap-2 rounded-full font-semibold ring-1 ring-border hover:bg-accent/20"
                >
                  <Layers className="h-5 w-5" />
                  Categories
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex items-center gap-2 rounded-full font-semibold"
                >
                  <Filter className="h-5 w-5" />
                  Filters
                </Button>
              </div>
            </div>
            <div className="avatar hidden md:block">
              <img
                className="w-48 h-48 object-contain rounded-2xl shadow-xl drop-shadow-xl"
                src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=thumb&w=512&q=80"
                alt="Modern product hero"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section
        className="container mt-0"
        style={{ animationDelay: "100ms" }}
      >
        <div className="rounded-2xl shadow-[0_1.5px_32px_-9px_rgba(0,0,0,0.10)] bg-card/90 px-3 md:px-7 py-5 animate-fade-in flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-border/40 backdrop-blur-sm">
          <ProductFilters
            filters={filters}
            sortOption={sortOption}
            onFiltersChange={setFilters}
            onSortChange={setSortOption}
            className="md:flex-1"
          />
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-xs md:text-sm mt-2 md:mt-0"
            onClick={() => setFilters({ category: "", minPrice: 0, maxPrice: 1000, search: "" })}
          >
            <RotateCcw className="h-4 w-4" />
            Reset Filters
          </Button>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section
        className="container mt-12 md:mt-16 min-h-[32vh] animate-fade-in"
        style={{ animationDelay: "220ms" }}
      >
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 sm:py-40 text-center rounded-2xl bg-muted/60 border border-dashed border-border/50 shadow-inner">
            <img
              src="https://illustrations.popsy.co/gray/search-8.svg"
              alt="No products"
              className="h-32 opacity-70 mx-auto mb-8"
              draggable={false}
            />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">Nothing here...</h2>
            <p className="mb-5 text-muted-foreground/90 max-w-md mx-auto">
              No products found for your selection. Try a different search or reset your filters to browse our full collection.
            </p>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setFilters({
                category: "",
                minPrice: 0,
                maxPrice: 1000,
                search: ""
              })}
              className="rounded-full"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Filters
            </Button>
          </div>
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </section>
    </Layout>
  );
};

export default Products;
