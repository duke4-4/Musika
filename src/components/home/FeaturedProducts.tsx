import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import { products } from "@/data/products";

export const FeaturedProducts = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-secondary/20" />
      {/* Subtle animated background shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary">Featured Collection</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent mb-4">
            Best Selling Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover our most loved items, carefully curated for quality and style
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-background to-secondary/50 border border-border/50 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 hover:border-primary/30">
                <ProductCard product={product} />
                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            asChild
            className="group bg-gradient-to-r from-background to-secondary/50 border-primary/30 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 px-8 py-3"
          >
            <Link to="/products" className="flex items-center gap-2">
              <span>Explore All Products</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
