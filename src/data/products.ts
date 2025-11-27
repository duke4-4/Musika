import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "High-fidelity audio with active noise cancellation. Experience crystal-clear sound with up to 30 hours of battery life.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    category: "Electronics",
    stock: 15,
    rating: 4.8,
    reviews: 124
  },
  {
    id: "2",
    name: "Minimalist Leather Watch",
    description: "Elegant timepiece with genuine leather strap. Swiss movement with sapphire crystal glass.",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    category: "Accessories",
    stock: 8,
    rating: 4.9,
    reviews: 89
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    description: "Sustainably sourced premium cotton. Comfortable fit with a modern silhouette.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
    category: "Clothing",
    stock: 50,
    rating: 4.6,
    reviews: 256
  },
  {
    id: "4",
    name: "Smart Home Speaker",
    description: "Voice-controlled assistant with premium sound. Control your entire smart home ecosystem.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&q=80",
    category: "Electronics",
    stock: 23,
    rating: 4.7,
    reviews: 312
  },
  {
    id: "5",
    name: "Handcrafted Ceramic Vase",
    description: "Artisan-made decorative piece. Each piece is unique with subtle variations.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500&q=80",
    category: "Home",
    stock: 12,
    rating: 4.5,
    reviews: 45
  },
  {
    id: "6",
    name: "Premium Running Shoes",
    description: "Lightweight design with responsive cushioning. Perfect for both training and racing.",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    category: "Footwear",
    stock: 35,
    rating: 4.8,
    reviews: 178
  },
  {
    id: "7",
    name: "Vintage Sunglasses",
    description: "Classic aviator style with polarized lenses. UV400 protection for all-day comfort.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80",
    category: "Accessories",
    stock: 20,
    rating: 4.4,
    reviews: 67
  },
  {
    id: "8",
    name: "Mechanical Keyboard",
    description: "Tactile switches with RGB backlighting. Premium build quality for gaming and productivity.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80",
    category: "Electronics",
    stock: 18,
    rating: 4.9,
    reviews: 203
  }
];

export const categories = [...new Set(products.map(p => p.category))];
