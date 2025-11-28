import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="grow flex flex-col justify-center items-center py-20">
        <div className="max-w-xl w-full mx-auto text-center">
          <div className="mb-8">
            <span className="inline-block rounded-full bg-accent/30 text-accent font-extrabold text-7xl p-6 shadow-lg select-none animate-bounce-slow">
              Oops!
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-accent via-primary to-foreground bg-clip-text text-transparent mb-4">
            404: Page Not Found
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            The page you&#39;re looking for doesn&#39;t exist or has been moved.<br/>
            Don&#39;t worry, it happens to the best of us!
          </p>
          <div className="mt-10 flex justify-center">
            <Button
              variant="accent"
              size="lg"
              className="rounded-xl gap-2 shadow-lg"
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
