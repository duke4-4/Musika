import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden hero-gradient">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80')] bg-cover bg-center opacity-10" />
      
      <div className="container relative py-24 md:py-32 lg:py-40">
        <div className="max-w-2xl space-y-6 animate-slide-up">
          <span className="inline-block rounded-full bg-accent/20 px-4 py-1.5 text-sm font-medium text-accent">
            New Collection 2024
          </span>
          
          <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl md:text-6xl">
            Discover Premium
            <br />
            <span className="text-accent">Luxury Products</span>
          </h1>
          
          <p className="text-lg text-primary-foreground/80 max-w-lg">
            Explore our curated collection of exceptional quality products. 
            From electronics to fashion, find everything you need in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="accent" size="xl" asChild>
              <Link to="/products">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/categories">
                Browse Categories
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-1 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
