import { Link } from "react-router-dom";
import { User, Package, Heart, Settings, LogOut } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const features = [
  {
    to: "/orders",
    icon: <Package className="h-7 w-7 text-accent" />,
    title: "Orders",
    desc: "Track your orders, view history"
  },
  {
    to: "/wishlist",
    icon: <Heart className="h-7 w-7 text-accent" />,
    title: "Wishlist",
    desc: "Browse your saved products"
  },
  {
    to: "/settings",
    icon: <Settings className="h-7 w-7 text-accent" />,
    title: "Settings",
    desc: "Personalize your experience"
  }
];

const Account = () => {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return (
      <Layout>
        <div className="container min-h-[75vh] flex items-center justify-center py-12 animate-fade-in">
          <div className="w-full max-w-md rounded-3xl shadow-2xl bg-gradient-to-br from-accent/10 to-card/95 border border-border/70 backdrop-blur-2xl p-10 space-y-9">
            <div className="flex flex-col items-center mb-2">
              <div className="flex items-center justify-center h-24 w-24 rounded-2xl bg-gradient-to-tr from-accent/20 via-accent/10 to-accent/40 mb-4 ring-4 ring-accent/30 shadow-xl animate-fade-in-slow scale-100 hover:scale-105 duration-200 transition-transform backdrop-blur-xl">
                <User className="h-12 w-12 text-accent drop-shadow-lg" />
              </div>
              <h1 className="text-4xl font-black tracking-tighter mb-1 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent animate-gradient-x">
                Welcome Back to Musika
              </h1>
              <p className="mt-2 text-muted-foreground/90 text-base text-center leading-relaxed">
                Sign in to your account or create a new one to start exploring personalized features.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-gradient-to-bl from-card/90 to-accent/10 backdrop-blur-lg p-7 shadow-inner space-y-7 animate-fade-in-up">
              <Button
                variant="accent"
                className="w-full text-lg font-bold py-3 rounded-xl shadow-lg hover:scale-[1.03] transition-transform gap-2"
                size="lg"
                asChild
              >
                <Link to="/login">
                  <User className="mr-2 h-5 w-5" />
                  Sign In
                </Link>
              </Button>
              <div className="relative flex items-center my-4">
                <Separator className="flex-1" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-4 py-1 rounded-full text-xs text-muted-foreground/70 ring-1 ring-border shadow">
                  or
                </span>
              </div>
              <Button
                variant="outline"
                className="w-full text-lg font-bold py-3 rounded-xl border-accent/40 hover:border-accent/80 hover:bg-accent/10 transition-shadow gap-2"
                size="lg"
                asChild
              >
                <Link to="/register">
                  <Settings className="mr-2 h-5 w-5 text-accent" />
                  Create Account
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-14 md:py-20 animate-fade-in">
        <h1 className="text-5xl font-extrabold bg-gradient-to-tr from-accent to-primary bg-clip-text text-transparent mb-12 tracking-tight text-center animate-gradient-x">
          My Account
        </h1>
        <div className="mt-2 grid gap-8 md:grid-cols-3 xl:grid-cols-4 md:gap-10">
          {features.map((item) => (
            <Link
              key={item.title}
              to={item.to}
              className={`
                group flex flex-col items-center gap-5 rounded-3xl border border-border/70
                bg-gradient-to-br from-accent/10 to-card/80 p-9 shadow-xl hover:shadow-2xl
                transition-all hover:scale-105 duration-200 hover:bg-gradient-to-br hover:from-accent/20 hover:to-card/95
                focus-visible:ring-2 focus-visible:ring-accent cursor-pointer
                backdrop-blur-md
              `}
              tabIndex={0}
            >
              <div className="rounded-xl p-5 bg-accent/10 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform ring-2 ring-accent/20">
                {item.icon}
              </div>
              <div className="w-full text-center mt-2">
                <h3 className="font-extrabold text-2xl mb-1 text-foreground/90 tracking-tight">{item.title}</h3>
                <p className="text-sm text-muted-foreground/90 font-medium">{item.desc}</p>
              </div>
            </Link>
          ))}
          <button
            className={`
              flex flex-col items-center gap-5 rounded-3xl border border-border/60 bg-gradient-to-br from-accent/20 to-card/95
              p-9 shadow-xl hover:shadow-2xl transition-all hover:scale-105 duration-200
              focus-visible:ring-2 ring-accent cursor-pointer outline-none animate-fade-in group
              backdrop-blur-md
            `}
            aria-label="Sign Out"
            tabIndex={0}
            type="button"
            onClick={() => {/* Add sign out logic here */}}
          >
            <div className="rounded-xl p-5 bg-accent/10 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform ring-2 ring-accent/20">
              <LogOut className="h-7 w-7 text-accent drop-shadow-lg" />
            </div>
            <div className="w-full text-center mt-2">
              <h3 className="font-extrabold text-2xl mb-1 text-accent tracking-tight">Sign Out</h3>
              <p className="text-sm text-muted-foreground font-medium">Log out of account</p>
            </div>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
