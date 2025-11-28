import { Link } from "react-router-dom";
import { ShoppingCart, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";

export const Header = () => {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-[60] w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg">
      <div className="container flex h-20 items-center justify-between">
    
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-md ring-2 ring-accent/20 bg-accent transition-transform">
            <span className="text-3xl font-extrabold tracking-tighter text-accent-foreground drop-shadow-md select-none">
              M
            </span>
          </div>
          <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-accent to-orange-700 bg-clip-text text-transparent select-none group-hover:scale-105 transition-transform">
            Musika
          </span>
        </Link>

        
        <nav className="hidden md:flex items-center gap-10 ml-8">
          <Link
            to="/"
            className="text-base font-semibold px-4 py-2 rounded-lg text-accent transition-all hover:text-white hover:bg-accent focus-visible:ring-2 focus-visible:ring-accent/30 focus:outline-none"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-base font-semibold px-4 py-2 rounded-lg text-accent transition-all hover:text-white hover:bg-accent focus-visible:ring-2 focus-visible:ring-accent/30 focus:outline-none"
          >
            Products
          </Link>
          <Link
            to="/categories"
            className="text-base font-semibold px-4 py-2 rounded-lg text-accent transition-all hover:text-white hover:bg-accent focus-visible:ring-2 focus-visible:ring-accent/30 focus:outline-none"
          >
            Categories
          </Link>
        </nav>

        {/* Actions (search, user, cart) using accent variant */}
        <div className="flex items-center gap-1.5 md:gap-2">
          <Button
            variant="accent"
            size="icon"
            className="hidden md:flex rounded-full"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="accent"
            size="icon"
            className="rounded-full"
            asChild
            aria-label="Account"
          >
            <Link to="/account">
              <User className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            variant="accent"
            size="icon"
            className="relative rounded-full"
            asChild
            aria-label="Cart"
          >
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge
                  variant="accent"
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full flex items-center justify-center text-[0.7rem] font-bold shadow-lg p-0 animate-bounce"
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
