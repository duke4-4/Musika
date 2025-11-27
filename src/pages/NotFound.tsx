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
        <div className="flex flex-col items-center gap-6 p-8 rounded-3xl shadow-2xl bg-gradient-to-br from-red-50/80 via-card/90 to-primary/10 dark:from-card dark:to-card border border-border/60 backdrop-blur-2xl">
          <div className="flex items-center justify-center h-24 w-24 rounded-2xl bg-gradient-to-tr from-red-400/20 to-primary/30 mb-2 ring-4 ring-primary/10 shadow-lg animate-fade-in-slow">
            <AlertTriangle className="h-14 w-14 text-red-400 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-red-500 via-primary to-foreground bg-clip-text text-transparent animate-gradient-x mb-3">
            404
          </h1>
          <p className="text-lg md:text-2xl text-muted-foreground/80 mb-1">
            Oops! The page you are looking for does not exist.
          </p>
          <Button
            variant="accent"
            size="lg"
            className="rounded-xl gap-2 shadow-lg bg-gradient-to-tr from-primary to-red-400/80"
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
