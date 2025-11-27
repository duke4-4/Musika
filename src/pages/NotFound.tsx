import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, ArrowRight, Music } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[75vh] flex items-center justify-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-primary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,107,107,0.05),transparent_50%)]" />

        <div className="container relative z-10 px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            {/* Animated Music Icon */}
            <div className="relative mb-8">
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 ring-1 ring-primary/20 shadow-2xl">
                <Music className="h-16 w-16 text-primary animate-pulse" />
              </div>

              {/* Floating particles */}
              <div className="absolute -top-4 -left-4 h-6 w-6 rounded-full bg-primary/20 animate-bounce [animation-delay:0.5s]" />
              <div className="absolute -top-2 -right-6 h-4 w-4 rounded-full bg-accent/30 animate-bounce [animation-delay:1s]" />
              <div className="absolute -bottom-4 left-8 h-5 w-5 rounded-full bg-primary/25 animate-bounce [animation-delay:0.8s]" />
            </div>

            {/* 404 Number */}
            <div className="mb-6">
              <h1 className="text-8xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent md:text-9xl">
                404
              </h1>
            </div>

            {/* Main Content */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4 md:text-4xl">
                Page Not Found
              </h2>
              <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                The page you're looking for seems to have wandered off into the digital void.
                Don't worry, let's get you back to the rhythm!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
              <Button
                variant="accent"
                size="lg"
                className="group text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link to="/" className="flex items-center gap-2">
                  <Home className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                  Back to Home
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 h-auto border-2 hover:border-primary/50 transition-all duration-300"
                asChild
              >
                <Link to="/products" className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Browse Products
                </Link>
              </Button>
            </div>

            {/* Additional Help */}
            <div className="mt-12 pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-4">
                Can't find what you're looking for?
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Link
                  to="/products"
                  className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
                >
                  Shop All Products
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link
                  to="/account"
                  className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
                >
                  My Account
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link
                  to="/cart"
                  className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
                >
                  View Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
