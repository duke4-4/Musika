import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Star, ShoppingCart, Heart, Share2, Package, Truck, Shield, Award } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { ProductCard } from "@/components/products/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <Layout>
        <div className="min-h-[75vh] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-accent/5" />
          <div className="container relative z-10 px-4 py-16 text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-muted/50 to-muted/30 mb-6">
              <Package className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Button variant="outline" className="mt-4" asChild>
              <Link to="/products">
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
      <div className="min-h-screen relative">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/10 to-primary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)]" />

        <div className="container relative z-10 py-8 md:py-16">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-8 group hover:bg-primary/5 transition-colors"
            asChild
          >
            <Link to="/products" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to products
            </Link>
          </Button>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Product Image */}
            <div className="relative">
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-secondary/50 to-secondary/20 shadow-2xl ring-1 ring-border/50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

                {/* Stock badge */}
                {product.stock < 5 && product.stock > 0 && (
                  <Badge className="absolute top-6 left-6 bg-accent text-accent-foreground shadow-lg animate-pulse">
                    Only {product.stock} left
                  </Badge>
                )}

                {/* Out of stock overlay */}
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive" className="text-lg px-4 py-2">
                      Out of Stock
                    </Badge>
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <div className="space-y-6">
                {/* Category Badge */}
                <Badge
                  variant="secondary"
                  className="w-fit text-sm px-3 py-1 bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-primary/20"
                >
                  {product.category}
                </Badge>

                {/* Product Name */}
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent leading-tight">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 transition-colors ${
                          i < Math.floor(product.rating)
                            ? "fill-accent text-accent"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground font-medium">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Description */}
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  {product.description}
                </p>

                <Separator className="my-8" />

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
                    <Truck className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium text-center">Free Shipping</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
                    <Shield className="h-6 w-6 text-accent" />
                    <span className="text-sm font-medium text-center">2 Year Warranty</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
                    <Award className="h-6 w-6 text-green-600" />
                    <span className="text-sm font-medium text-center">Premium Quality</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-6">
                  <span className="text-sm font-semibold">Quantity:</span>
                  <div className="flex items-center gap-3 bg-secondary/50 rounded-lg p-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.stock} available
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    variant="accent"
                    size="lg"
                    className="flex-1 h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-14 px-4 border-2 hover:border-primary/50 transition-colors"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-14 px-4 border-2 hover:border-primary/50 transition-colors"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Related Products
                </h2>
                <p className="text-muted-foreground text-lg">
                  Discover more products you might like
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-in slide-in-from-bottom-5 duration-500"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
