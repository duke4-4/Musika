import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard = ({ product, className }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-background via-card/90 to-accent/10 shadow-xl hover:shadow-2xl hover:scale-[1.021] transition-all duration-300 border border-border/40",
        className
      )}
    >
      {/* Modern image with glassmorphic badge overlays */}
      <Link to={`/products/${product.id}`} className="relative aspect-[4/3] overflow-hidden rounded-t-3xl">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-105 group-hover:contrast-115"
        />
        {/* Modern glass badge for stock info */}
        {product.stock < 5 && product.stock > 0 && (
          <span className="absolute top-4 left-4 z-10 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground shadow-md border border-accent/70 backdrop-blur-md">
            <span className="inline-block animate-pulse">
              Only {product.stock} left
            </span>
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-4 left-4 z-10 rounded-full bg-accent/60 px-3 py-1 text-xs font-semibold text-accent-foreground shadow-md border border-accent/60 backdrop-blur-md">
            Out of stock
          </span>
        )}
        {/* Subtle floating glow effect */}
        <span className="pointer-events-none absolute inset-0 z-0 rounded-t-3xl bg-gradient-to-t from-background/30 via-transparent to-accent/20 blur-xl opacity-30" />
      </Link>

      <div className="flex flex-1 flex-col gap-2 px-5 py-4 sm:py-5">
        {/* Category Modern Label using accent */}
        <span className="self-start text-[0.7rem] font-semibold uppercase tracking-widest text-accent px-2 py-0.5 bg-accent/10 rounded-md mb-1 shadow-sm">
          {product.category}
        </span>

        <Link to={`/products/${product.id}`} className="focus:outline-none focus-visible:ring-2 ring-accent/50 rounded">
          <h3 className="font-heading text-lg sm:text-xl max-w-full font-extrabold tracking-tight line-clamp-1 bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent transition-colors group-hover:from-primary group-hover:to-accent">
            {product.name}
          </h3>
        </Link>

        {/* Description Modern Style */}
        <p className="text-sm text-muted-foreground/95 line-clamp-2 mt-0">
          {product.description}
        </p>

        {/* Price & Actions */}
        <div className="mt-auto pt-6 flex items-end justify-between gap-2">
          <div>
            <span className="inline-block text-[1.13rem] sm:text-xl font-black text-accent bg-gradient-to-r from-accent to-primary/80 bg-clip-text text-transparent drop-shadow-sm">
              ${product.price.toFixed(2)}
            </span>
            <div className="flex items-center gap-1.5 mt-2">
              <Star className="h-4 w-4 fill-accent text-accent drop-shadow" />
              <span className="text-xs font-bold text-accent">
                {product.rating}
              </span>
              <span className="text-xs text-muted-foreground/80 font-mono">({product.reviews})</span>
            </div>
          </div>
          {/* Modern floating add-to-cart btn - accent color */}
          <Button
            variant="accent"
            size="icon"
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className={cn(
              "rounded-full shadow-lg border-transparent bg-accent text-accent-foreground transition-transform duration-150 hover:scale-110 hover:shadow-xl cursor-pointer",
              product.stock === 0 ? "opacity-40 pointer-events-none" : ""
            )}
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
