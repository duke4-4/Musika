import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container min-h-[70vh] flex flex-col items-center justify-center animate-fade-in">
        <div className="flex flex-col items-center gap-6 p-8 rounded-3xl shadow-2xl bg-gradient-to-br from-accent/20 via-card/90 to-accent/5 border border-border/60 backdrop-blur-2xl">
          <div className="flex items-center justify-center h-24 w-24 rounded-2xl bg-gradient-to-tr from-accent/40 to-accent/5 mb-2 ring-4 ring-accent/10 shadow-lg animate-fade-in-slow">
            <AlertTriangle className="h-14 w-14 text-accent animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-accent via-primary to-foreground bg-clip-text text-transparent animate-gradient-x mb-3">
            404
          </h1>
          <p className="text-lg md:text-2xl text-muted-foreground/80 mb-1">
            Oops! The page you are looking for does not exist.
          </p>
          <Button
            variant="accent"
            size="lg"
            className="rounded-xl gap-2 shadow-lg"
            asChild
          >
            <Link to="/">
              <ArrowLeft className="h-5 w-5" />
              Return to Musika
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
