import { Link } from "react-router-dom";
import { categories } from "@/data/products";

const categoryImages: Record<string, string> = {
  Electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80",
  Accessories: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&q=80",
  Clothing: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80",
  Home: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80",
  Footwear: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&q=80",
};

export const CategoryShowcase = () => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-primary/5" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-primary/5 to-accent/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-accent/5 to-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-background/30 backdrop-blur-[2px]" />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-accent to-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-accent">Shop by Category</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground via-accent to-primary bg-clip-text text-transparent mb-4">
            Discover Your Style
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore curated collections designed to match your unique taste and lifestyle
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category, index) => (
            <Link
              key={category}
              to={`/products?category=${category}`}
              className="group relative aspect-square overflow-hidden rounded-2xl animate-fade-in-up bg-gradient-to-br from-background/80 to-secondary/50 backdrop-blur-sm border border-border/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-3 hover:border-primary/30"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={categoryImages[category] || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80"}
                alt={category}
                className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              />

              {/* Enhanced gradient overlay with glass effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent backdrop-blur-[1px] transition-all duration-500 group-hover:from-primary/80 group-hover:via-primary/20" />

              {/* Category title with enhanced styling */}
              <div className="absolute inset-0 flex items-end justify-center p-6">
                <div className="text-center transform transition-transform duration-500 group-hover:scale-105">
                  <h3 className="text-xl font-bold text-primary-foreground drop-shadow-lg mb-1">
                    {category}
                  </h3>
                  <div className="w-8 h-0.5 bg-accent/80 mx-auto rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
