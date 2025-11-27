import { Link } from "react-router-dom";
import { ShoppingCart, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";

export const Header = () => {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-[60] w-full border-b border-border/40 shadow-sm bg-background/85 backdrop-blur-md transition-all duration-300 supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-20 items-center justify-between">
        {/* Logo Modernized */}
        <Link to="/" className="flex items-center gap-3 group cursor-pointer transition-transform active:scale-95">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-primary via-accent to-primary shadow-lg ring-2 ring-accent/15 group-hover:scale-110 group-hover:bg-accent transition-transform">
            <span className="text-2xl font-black tracking-tighter text-primary-foreground drop-shadow-sm select-none">M</span>
          </div>
          <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-foreground bg-clip-text text-transparent select-none group-hover:scale-105 transition-transform drop-shadow">
            Musika
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-10 ml-8">
          <Link
            to="/"
            className="text-base font-semibold px-3 py-1.5 rounded-lg text-muted-foreground/90 transition-all hover:text-primary hover:bg-accent/10 focus-visible:ring-2 ring-accent"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-base font-semibold px-3 py-1.5 rounded-lg text-muted-foreground/90 transition-all hover:text-primary hover:bg-accent/10 focus-visible:ring-2 ring-accent"
          >
            Products
          </Link>
          <Link
            to="/categories"
            className="text-base font-semibold px-3 py-1.5 rounded-lg text-muted-foreground/90 transition-all hover:text-primary hover:bg-accent/10 focus-visible:ring-2 ring-accent"
          >
            Categories
          </Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1.5 md:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex rounded-full border border-transparent hover:border-accent focus:ring-2 focus:ring-accent/40 bg-muted/40 transition-all"
            aria-label="Search"
          >
            <Search className="h-5 w-5 text-accent" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border border-transparent hover:border-accent focus:ring-2 focus:ring-accent/40 bg-muted/40 transition-all"
            asChild
            aria-label="Account"
          >
            <Link to="/account">
              <User className="h-5 w-5 text-primary" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full border border-transparent hover:border-accent focus:ring-2 focus:ring-accent/40 bg-muted/40 transition-all"
            asChild
            aria-label="Cart"
          >
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5 text-accent" />
              {totalItems > 0 && (
                <Badge
                  variant="default"
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full flex items-center justify-center text-[0.72rem] font-bold bg-gradient-to-tr from-accent to-primary text-primary-foreground shadow-lg p-0 animate-bounce"
                >
                  {totalItems}
                </Badge>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
