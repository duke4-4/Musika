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
        "group relative flex flex-col overflow-hidden rounded-xl bg-card card-shadow transition-all duration-300 hover:card-shadow-hover",
        className
      )}
    >
      <Link to={`/products/${product.id}`} className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.stock < 5 && product.stock > 0 && (
          <span className="absolute top-3 left-3 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            Only {product.stock} left
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-3 left-3 rounded-full bg-destructive px-3 py-1 text-xs font-medium text-destructive-foreground">
            Out of stock
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {product.category}
        </span>
        <Link to={`/products/${product.id}`}>
          <h3 className="mt-1 font-semibold text-card-foreground line-clamp-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-price">
              ${product.price.toFixed(2)}
            </span>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
              <span className="text-xs text-muted-foreground">
                {product.rating} ({product.reviews})
              </span>
            </div>
          </div>
          <Button
            variant="default"
            size="icon"
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className="rounded-full"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
