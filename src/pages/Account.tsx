import { Link } from "react-router-dom";
import { User, Package, Heart, Settings, LogOut } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const features = [
  {
    to: "/orders",
    icon: <Package className="h-7 w-7 text-blue-500 drop-shadow-lg" />,
    title: "Orders",
    desc: "Track your orders, view history",
    color: "from-blue-200/80 to-blue-400/20 dark:from-blue-900/60 dark:to-blue-600/10",
    ring: "ring-2 ring-blue-400/10"
  },
  {
    to: "/wishlist",
    icon: <Heart className="h-7 w-7 text-pink-500 drop-shadow-lg" />,
    title: "Wishlist",
    desc: "Browse your saved products",
    color: "from-pink-200/80 to-pink-400/20 dark:from-pink-900/40 dark:to-pink-700/10",
    ring: "ring-2 ring-pink-400/10"
  },
  {
    to: "/settings",
    icon: <Settings className="h-7 w-7 text-green-600 drop-shadow-lg" />,
    title: "Settings",
    desc: "Personalize your experience",
    color: "from-green-200/70 to-green-400/20 dark:from-green-800/30 dark:to-green-600/10",
    ring: "ring-2 ring-green-400/10"
  }
];

const Account = () => {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return (
      <Layout>
        <div className="container min-h-[75vh] flex items-center justify-center py-12 animate-fade-in">
          <div className="w-full max-w-md rounded-3xl shadow-2xl bg-gradient-to-br from-blue-50/40 via-card/90 to-fuchsia-100/30 dark:from-card/80 dark:via-card/60 dark:to-card/95 border border-border/60 backdrop-blur-2xl p-10 space-y-8">
            <div className="flex flex-col items-center mb-2">
              <div className="flex items-center justify-center h-24 w-24 rounded-2xl bg-gradient-to-tr from-blue-400/20 via-blue-200/20 to-fuchsia-400/50 mb-4 ring-4 ring-blue-400/20 shadow-lg animate-fade-in-slow scale-100 hover:scale-105 duration-200 transition-transform backdrop-blur-lg">
                <User className="h-12 w-12 text-blue-400 drop-shadow-lg" />
              </div>
              <h1 className="text-4xl font-black tracking-tighter mb-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-fuchsia-500 bg-clip-text text-transparent animate-gradient-x">
                Welcome Back to Musika
              </h1>
              <p className="mt-2 text-muted-foreground/90 text-base text-center leading-relaxed">
                Sign in to your account or create a new one to start exploring personalized features.
              </p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-gradient-to-bl from-card/80 to-blue-50/20 dark:to-card/85 backdrop-blur-xl p-7 shadow-inner space-y-6 animate-fade-in-up">
              <Button
                variant="accent"
                className="w-full text-lg font-bold py-3 rounded-xl shadow-lg shadow-blue-300/10 hover:scale-[1.025] transition-transform gap-2 bg-gradient-to-tr from-blue-400/90 to-fuchsia-400/60"
                size="lg"
                asChild
              >
                <Link to="/login">
                  <User className="mr-2 h-5 w-5" />
                  Sign In
                </Link>
              </Button>
              <div className="relative flex items-center my-2">
                <Separator className="flex-1" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card/90 px-4 py-1 rounded-full text-xs text-muted-foreground/70 ring-1 ring-border shadow shadow-blue-100/50">
                  or
                </span>
              </div>
              <Button
                variant="outline"
                className="w-full text-lg font-bold py-3 rounded-xl hover:bg-gradient-to-r hover:from-fuchsia-100/30 hover:to-blue-100/30 transition-shadow gap-2"
                size="lg"
                asChild
              >
                <Link to="/register">
                  <Settings className="mr-2 h-5 w-5" />
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
        <h1 className="text-5xl font-extrabold bg-gradient-to-tr from-blue-400 via-indigo-400 to-fuchsia-500 bg-clip-text text-transparent mb-12 tracking-tight text-center animate-gradient-x">
          My Account
        </h1>
        <div className="mt-2 grid gap-8 md:grid-cols-3 xl:grid-cols-4 md:gap-10">
          {features.map((item) => (
            <Link
              key={item.title}
              to={item.to}
              className={`
                group flex flex-col items-center gap-5 rounded-3xl border border-border/60 bg-gradient-to-br ${item.color} p-9 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.045] duration-200
                hover:bg-gradient-to-tr hover:from-secondary/20 hover:to-card/80 focus-visible:ring-2 focus-visible:ring-accent cursor-pointer
                backdrop-blur-md
              `}
              tabIndex={0}
            >
              <div className={`rounded-xl p-5 bg-white/70 dark:bg-card/40 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform ${item.ring}`}>
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
              flex flex-col items-center gap-5 rounded-3xl border border-border/60 bg-gradient-to-br from-red-100/80 via-card/80 to-red-200/40
              dark:from-red-900/20 dark:via-card/80 dark:to-card/95 p-9 shadow-xl hover:shadow-2xl transition-all
              hover:scale-[1.045] duration-200 focus-visible:ring-2 ring-red-400/40 cursor-pointer outline-none
              animate-fade-in
              group
              backdrop-blur-md
            `}
            aria-label="Sign Out"
            tabIndex={0}
            type="button"
            onClick={() => {/* Add sign out logic here */}}
          >
            <div className="rounded-xl p-5 bg-white/80 dark:bg-red-900/20 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform ring-2 ring-red-400/10">
              <LogOut className="h-7 w-7 text-red-500 drop-shadow-lg" />
            </div>
            <div className="w-full text-center mt-2">
              <h3 className="font-extrabold text-2xl mb-1 text-red-700/90 dark:text-red-500 tracking-tight">Sign Out</h3>
              <p className="text-sm text-muted-foreground font-medium">Log out of account</p>
            </div>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
