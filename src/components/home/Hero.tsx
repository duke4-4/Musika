import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section
      className="relative flex items-center justify-center min-h-[60vh] bg-background"
      style={{
        backgroundImage:
          "linear-gradient(rgba(18, 17, 21, 0.72), rgba(18, 17, 21, 0.80)), url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto max-w-2xl px-4 text-center relative z-10 flex flex-col items-center gap-7">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-xl leading-tight mb-2">
          Elevate Your Lifestyle
        </h1>
        <p className="text-base sm:text-xl text-white/85 font-medium mb-5 drop-shadow-sm">
          Discover and shop next-gen <span className="text-accent font-semibold">luxury & innovation</span>—curated for you.
        </p>
        <div className="flex gap-3 w-full justify-center">
          <Button
            asChild
            size="lg"
            variant="accent"
            className="flex items-center gap-2 px-7 rounded-full shadow-lg hover:scale-[1.03] transition font-medium text-white"
          >
            <Link to="/products">
              Shop Now <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="ghost"
            className="px-7 rounded-full border border-accent/50 text-white/90 hover:bg-accent hover:text-primary-foreground hover:scale-[1.03] transition font-medium"
          >
            <Link to="/categories">
              Categories
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
