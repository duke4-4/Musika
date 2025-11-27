import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Header = () => {
  const { totalItems } = useCart();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 opacity-50" />

      <div className="container relative flex h-16 items-center justify-between">
        {/* Enhanced Logo */}
        <Link
          to="/"
          className="group flex items-center gap-3 transition-all duration-300 hover:scale-105"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary to-accent shadow-lg shadow-primary/25 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-primary/40 group-hover:scale-110">
            <span className="text-lg font-black text-primary-foreground bg-gradient-to-br from-primary-foreground to-accent-foreground bg-clip-text text-transparent">
              M
            </span>
            {/* Animated ring effect */}
            <div className="absolute inset-0 rounded-xl border-2 border-primary/20 scale-0 group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Musika
            </span>
            <div className="h-0.5 w-0 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:bg-primary/10 hover:text-primary",
                isActive(item.href)
                  ? "text-primary bg-primary/10 shadow-sm"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
              {/* Active indicator */}
              {isActive(item.href) && (
                <div className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 bg-gradient-to-r from-primary to-accent rounded-full" />
              )}
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          {/* Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex relative group rounded-lg hover:bg-primary/10 transition-all duration-300"
          >
            <Search className="h-5 w-5 transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
          </Button>

          {/* Account Button */}
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="relative group rounded-lg hover:bg-primary/10 transition-all duration-300"
          >
            <Link to="/account">
              <User className="h-5 w-5 transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            </Link>
          </Button>

          {/* Cart Button */}
          <Button
            variant="ghost"
            size="icon"
            className="relative group rounded-lg hover:bg-primary/10 transition-all duration-300"
            asChild
          >
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
              {totalItems > 0 && (
                <Badge
                  variant="default"
                  className="absolute -top-1 -right-1 h-5 min-w-[20px] rounded-full p-0 flex items-center justify-center text-xs font-bold bg-gradient-to-r from-accent to-primary text-primary-foreground shadow-lg animate-pulse"
                >
                  {totalItems > 99 ? "99+" : totalItems}
                </Badge>
              )}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            </Link>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden ml-2 rounded-lg hover:bg-primary/10 transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="border-t border-border/40 bg-background/95 backdrop-blur-xl">
          <nav className="container py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 hover:bg-primary/10 hover:text-primary",
                  isActive(item.href)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
