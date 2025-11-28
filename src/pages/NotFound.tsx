import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

// Category definitions, use these in both NotFound and Products pages
const categories = [
  {
    name: "Guitars",
    slug: "guitars",
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Keyboards",
    slug: "keyboards",
    img: "https://images.unsplash.com/photo-1521747116042-5a810fda9664?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Drums",
    slug: "drums",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Microphones",
    slug: "microphones",
    img: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Studio",
    slug: "studio",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Accessories",
    slug: "accessories",
    img: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=400&q=80",
  },
];

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="grow pt-12 pb-16 flex flex-col items-center">
        <div className="w-full max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-black text-center tracking-tight bg-gradient-to-r from-accent via-primary to-foreground bg-clip-text text-transparent animate-gradient-x mb-3">
            Explore Product Categories
          </h1>
          <p className="text-lg md:text-xl text-center text-muted-foreground/90 mb-6">
            Lost? Check out our main product categories below!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-2 md:px-0">
            {categories.map((cat) => (
              <Link
                to={`/products?category=${cat.slug}`}
                key={cat.slug}
                className="group rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-border/60 bg-gradient-to-tr from-accent/5 via-card to-accent/5"
              >
                <div className="aspect-w-4 aspect-h-3 w-full bg-muted relative">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="object-cover h-full w-full group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                </div>
                <div className="flex flex-col items-center justify-center py-4">
                  <span className="text-2xl font-semibold text-accent group-hover:underline group-hover:text-accent-foreground transition">
                    {cat.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-16 flex flex-col items-center px-2">
            <div className="flex items-center justify-center gap-3 py-6 px-5 rounded-xl bg-muted/60 border border-border max-w-xl mx-auto shadow-md">
              <span className="text-xl md:text-2xl font-semibold text-accent">
                More categories&nbsp;
              </span>
              <span className="text-xl md:text-2xl font-semibold text-primary">
                coming soon&nbsp;
              </span>
              <span className="text-xl md:text-2xl font-semibold text-foreground">
                to Musika!
              </span>
            </div>
            <Button
              variant="accent"
              size="lg"
              className="rounded-xl gap-2 shadow-lg mt-8"
              asChild
            >
              <Link to="/">
                <ArrowLeft className="h-5 w-5" />
                Return to Musika Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
