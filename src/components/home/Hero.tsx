import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/80 via-background/70 to-accent/20">
      {/* Subtle blurred floating shapes for depth */}
      <div className="pointer-events-none absolute -top-24 left-1/2 z-0 h-[400px] w-[700px] -translate-x-1/2 blur-3xl opacity-40" style={{background:"radial-gradient(ellipse at center, var(--accent) 10%, transparent 70%)"}} />
      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80')] bg-cover bg-center bg-blend-overlay opacity-10" />
      {/* Optional glassmorphic frosted overlay */}
      <div className="absolute inset-0 z-10 bg-background/40 backdrop-blur-[1.5px]" />

      <div className="container relative z-20 py-32 md:py-40">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-7 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent/30 via-primary/10 to-foreground/5 px-6 py-2 text-sm font-medium text-accent border border-accent/30 shadow">
            <Sparkles className="h-4 w-4 animate-bounce text-yellow-400" />
            New For 2025 | Exclusives
          </span>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight bg-gradient-to-br from-primary via-accent to-foreground bg-clip-text text-transparent drop-shadow-md">
            Shop Tomorrow's
            <br />
            <span className="inline-block from-accent to-primary bg-gradient-to-r bg-clip-text text-transparent animate-gradient-x">
              Luxury Products
            </span>
          </h1>

          <p className="text-xl sm:text-2xl max-w-2xl mx-auto text-muted-foreground font-medium">
            Unveil the next wave of <span className="font-semibold text-accent">premium & innovative products</span>. From breakthrough electronics to style-defining fashion—find it all curated, just for you.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center w-full mt-2">
            <Button
              variant="accent"
              size="xl"
              asChild
              className="flex-1 sm:flex-none text-lg px-8 py-6 shadow-2xl shadow-accent/30 hover:scale-105 transition-all ring-2 ring-accent/60 ring-offset-2 ring-offset-background"
            >
              <Link to="/products">
                <span>Shop Now</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="xl"
              asChild
              className="flex-1 sm:flex-none text-lg px-8 py-6 border-2 border-accent/30 text-accent hover:bg-accent hover:text-primary-foreground hover:scale-105 transition-all bg-background/40 backdrop-blur-sm"
            >
              <Link to="/categories">
                <span>Browse Categories</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-1 left-0 right-0 h-36 bg-gradient-to-t from-background/80 via-background/10 to-transparent z-30" />
    </section>
  );
};
