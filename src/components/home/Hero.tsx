import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary/90 via-background/80 to-accent/30">
      {/* Enhanced animated background elements */}
      <div className="pointer-events-none absolute -top-32 left-1/2 z-0 h-[500px] w-[800px] -translate-x-1/2 blur-3xl opacity-30 animate-pulse" style={{background:"radial-gradient(ellipse at center, var(--accent) 15%, transparent 70%)"}} />
      <div className="pointer-events-none absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '3s' }} />
      <div className="pointer-events-none absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }} />

      {/* Enhanced vignette with better blending */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80')] bg-cover bg-center bg-blend-overlay opacity-8" />

      {/* Enhanced glassmorphic frosted overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/50 via-background/30 to-background/60 backdrop-blur-[2px]" />

      <div className="container relative z-20 py-32 md:py-40 min-h-screen flex items-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8 animate-fade-in-up">
          {/* Enhanced badge with better animations */}
          <div className="group relative">
            <span className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-accent/40 via-primary/20 to-accent/30 px-6 py-3 text-sm font-semibold text-accent border border-accent/40 shadow-lg shadow-accent/20 backdrop-blur-sm transition-all duration-500 hover:shadow-xl hover:shadow-accent/30 hover:scale-105">
              <Sparkles className="h-5 w-5 animate-pulse text-yellow-400" />
              <span>New For 2025</span>
              <div className="w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
              <span>Exclusives</span>
            </span>
            {/* Animated border effect */}
            <div className="absolute inset-0 rounded-2xl border border-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Enhanced main heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight">
            <span className="block bg-gradient-to-br from-primary via-accent to-foreground bg-clip-text text-transparent drop-shadow-lg">
              Shop Tomorrow's
            </span>
            <span className="inline-block from-accent via-primary to-accent bg-gradient-to-r bg-clip-text text-transparent animate-gradient-x bg-[length:200%_200%] drop-shadow-lg">
              Luxury Products
            </span>
          </h1>

          {/* Enhanced description */}
          <p className="text-xl sm:text-2xl max-w-3xl mx-auto text-muted-foreground/90 font-medium leading-relaxed">
            Unveil the next wave of <span className="font-bold text-accent bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">premium & innovative products</span>. From breakthrough electronics to style-defining fashion—find it all curated, just for you.
          </p>

          {/* Enhanced CTA buttons */}
          <div className="flex flex-col gap-6 sm:flex-row sm:justify-center w-full max-w-lg mt-4">
            <Button
              variant="accent"
              size="xl"
              asChild
              className="group relative flex-1 sm:flex-none text-lg px-10 py-7 shadow-2xl shadow-accent/40 hover:shadow-3xl hover:shadow-accent/50 hover:scale-105 transition-all duration-500 ring-2 ring-accent/70 ring-offset-2 ring-offset-background overflow-hidden"
            >
              <Link to="/products" className="flex items-center justify-center gap-3 relative z-10">
                <span className="font-semibold">Shop Now</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Button>

            <Button
              variant="ghost"
              size="xl"
              asChild
              className="group flex-1 sm:flex-none text-lg px-10 py-7 border-2 border-accent/40 text-accent hover:bg-accent/10 hover:text-accent hover:scale-105 transition-all duration-500 bg-background/60 backdrop-blur-sm hover:shadow-lg hover:shadow-accent/20"
            >
              <Link to="/categories" className="flex items-center justify-center gap-3">
                <span className="font-semibold">Browse Categories</span>
                <div className="w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced bottom gradient with better blending */}
      <div className="pointer-events-none absolute -bottom-1 left-0 right-0 h-48 bg-gradient-to-t from-background/90 via-background/30 to-transparent z-30" />
    </section>
  );
};
