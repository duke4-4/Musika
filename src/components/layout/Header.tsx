import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { useProducts } from "@/hooks/useProducts";

export const Header = () => {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const { data: products = [] } = useProducts();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products.slice(0, 8);
    const query = searchQuery.toLowerCase();
    return products
      .filter((product) => product.name.toLowerCase().includes(query) || product.description?.toLowerCase().includes(query))
      .slice(0, 8);
  }, [products, searchQuery]);

  const handleSelectProduct = (productId: string) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    navigate(`/products/${productId}`);
  };

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsSearchOpen((current) => !current);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
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
              size="lg"
              className="hidden md:flex items-center gap-2 rounded-full px-4"
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
              <span className="text-sm font-semibold">Search</span>
              <kbd className="ml-2 hidden rounded bg-background/40 px-2 py-0.5 text-[0.65rem] font-medium text-muted-foreground md:inline-flex">
                Ctrl+K
              </kbd>
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

      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <CommandInput
          placeholder="Search products..."
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>No products found.</CommandEmpty>
          <CommandGroup heading="Top matches">
            {filteredProducts.map((product) => (
              <CommandItem
                key={product.id}
                value={product.name}
                onSelect={() => handleSelectProduct(product.id)}
                className="flex items-center gap-4"
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-12 w-12 rounded-lg object-cover border border-border"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-lg bg-muted" />
                )}
                <div className="flex flex-col">
                  <span className="font-semibold">{product.name}</span>
                  <span className="text-sm text-muted-foreground">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
