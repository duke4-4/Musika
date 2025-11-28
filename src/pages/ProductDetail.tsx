import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Minus,
  Plus,
  Star,
  ShoppingCart,
  Heart,
  Share2,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { ProductCard } from "@/components/products/ProductCard";
import { useProducts } from "@/hooks/useProducts";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { data: products = [], isLoading } = useProducts();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  if (isLoading) {
    return (
      <Layout>
        <div className="container min-h-[60vh] flex flex-col items-center justify-center gap-4">
          <div className="h-12 w-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading product details…</p>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container min-h-[60vh] flex flex-col items-center justify-center">
          <div className="flex flex-col items-center animate-fade-in">
            <img
              src="https://illustrations.popsy.co/gray/box-open.svg"
              className="mb-8 h-32 opacity-70"
              alt="Not found"
            />
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-2">
              Product not found
            </h1>
            <p className="text-muted-foreground mb-4">
              The product you are looking for does not exist
            </p>
            <Button variant="accent" asChild>
              <Link to="/products" className="inline-flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to products
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8 flex items-center gap-2">
          <Button
            variant="accent"
            size="icon"
            className="rounded-full shadow-none border border-accent/30 hover:bg-accent/80 hover:text-accent-foreground"
            asChild
          >
            <Link to="/products">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <span className="ml-2 text-sm text-accent">
            <Link to="/products" className="hover:underline">
              Back to products
            </Link>
          </span>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-start animate-fade-in">
          {/* Product Image Block */}
          <div className="relative rounded-3xl bg-gradient-to-br from-accent/40 to-muted shadow-lg overflow-hidden aspect-square flex items-center justify-center min-h-[330px]">
            <img
              src={product.image}
              alt={product.name}
              className="object-contain w-5/6 max-h-[90%] drop-shadow-2xl transition-transform duration-300 hover:scale-105"
            />
            {product.stock < 5 && product.stock > 0 && (
              <Badge
                variant="accent"
                className="absolute top-5 left-5 z-10 text-xs rounded-full px-4 py-1 shadow-lg animate-pulse"
              >
                Only {product.stock} left
              </Badge>
            )}
            {product.stock === 0 && (
              <Badge
                variant="accent"
                className="absolute top-5 left-5 text-xs rounded-full px-5 py-1 shadow-lg opacity-80"
              >
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Product Details Block */}
          <div className="flex flex-col py-2 px-2 sm:px-6">
            <div className="flex items-center gap-2 mb-3">
              <Badge
                variant="accent"
                className="uppercase tracking-wide px-4 py-2 rounded-lg"
              >
                {product.category}
              </Badge>
            </div>

            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight leading-tight text-accent-foreground">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-[1.5px]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 drop-shadow ${
                      i < Math.floor(product.rating)
                        ? "fill-accent text-accent"
                        : "fill-muted text-accent-foreground/20"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs md:text-sm text-accent/70">
                {product.rating.toFixed(1)} ({product.reviews} reviews)
              </span>
            </div>

            <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <Separator className="my-7 bg-accent" />

            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-accent">
                ${product.price.toFixed(2)}
              </span>
              {product.price > 200 && (
                <span className="ml-2 text-sm text-accent font-semibold bg-accent/20 px-2 py-0.5 rounded">
                  Free Shipping
                </span>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-6 items-center">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-accent-foreground/80">Quantity:</span>
                <div className="flex items-center gap-1 bg-accent/10 rounded-lg px-2 py-1 shadow-inner">
                  <Button
                    variant="accent"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="rounded-full"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-10 text-center text-lg font-semibold select-none">
                    {quantity}
                  </span>
                  <Button
                    variant="accent"
                    size="icon"
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    disabled={quantity >= product.stock}
                    className="rounded-full"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <span className="text-xs text-accent/60">
                <span className="font-semibold text-accent">{product.stock}</span>{" "}
                available
              </span>
            </div>

            <div className="mt-10 flex flex-wrap gap-3 items-center">
              <Button
                variant="accent"
                size="lg"
                className="flex-1 min-w-[160px] shadow-lg font-bold uppercase text-base tracking-wide py-6"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                variant="accent"
                size="lg"
                className="rounded-full border-none shadow-none hover:bg-accent/80"
                aria-label="Add to wishlist"
              >
                <Heart className="h-5 w-5" />
              </Button>
              <Button
                variant="accent"
                size="lg"
                className="rounded-full border-none shadow-none hover:bg-accent/80"
                aria-label="Share"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {product.stock === 0 && (
              <p className="mt-6 text-sm text-destructive font-bold flex gap-2 items-center">
                <span className="animate-pulse w-2 h-2 rounded-full bg-red-500 inline-block" />
                This product is currently <span className="underline">out of stock</span>
              </p>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-7 tracking-tight flex items-center gap-2">
              <span className="inline-block bg-gradient-to-r from-accent via-accent/60 to-accent-foreground bg-clip-text text-transparent">
                Related Products
              </span>
              <span className="block h-1 w-12 bg-gradient-to-r from-accent to-accent rounded-full" />
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
