import { Link } from "react-router-dom";
import { categories } from "@/data/products";

const categoryImages: Record<string, string> = {
  Electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80",
  Accessories: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&q=80",
  Clothing: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80",
  Home: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80",
  Footwear: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&q=80",
};

export const CategoryShowcase = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
          <p className="mt-2 text-muted-foreground">
            Find exactly what you're looking for
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category, index) => (
            <Link
              key={category}
              to={`/products?category=${category}`}
              className="group relative aspect-square overflow-hidden rounded-xl animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <img
                src={categoryImages[category] || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80"}
                alt={category}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
              <div className="absolute inset-0 flex items-end justify-center p-4">
                <h3 className="text-lg font-semibold text-primary-foreground text-center">
                  {category}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
