import { Link } from "react-router-dom";
import { User, Package, Heart, Settings, LogOut } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const features = [
  {
    to: "/orders",
    icon: <Package className="h-7 w-7 text-blue-500" />,
    title: "Orders",
    desc: "Track your orders, view history",
    color: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    to: "/wishlist",
    icon: <Heart className="h-7 w-7 text-pink-500" />,
    title: "Wishlist",
    desc: "Browse your saved products",
    color: "bg-pink-100 dark:bg-pink-900/30",
  },
  {
    to: "/settings",
    icon: <Settings className="h-7 w-7 text-green-600" />,
    title: "Settings",
    desc: "Personalize your experience",
    color: "bg-green-100 dark:bg-green-900/30",
  }
];

const Account = () => {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return (
      <Layout>
        <div className="container min-h-[75vh] flex items-center justify-center py-12">
          <div className="w-full max-w-md rounded-3xl shadow-xl bg-gradient-to-b from-card/80 to-card/90 border border-border p-9">
            <div className="flex flex-col items-center mb-8">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-tr from-blue-400/10 to-blue-400/40 mb-4 ring-2 ring-blue-500/10 shadow">
                <User className="h-10 w-10 text-blue-400" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight mb-1 bg-gradient-to-r from-blue-400 to-fuchsia-500 bg-clip-text text-transparent">
                Welcome Back to Musika
              </h1>
              <p className="mt-2 text-muted-foreground text-base">
                Sign in to your account or create a new one to start exploring personalized features.
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/80 backdrop-blur-md p-6 shadow-inner">
              <Button variant="accent" className="w-full text-base font-semibold py-3" size="lg" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <div className="relative my-6 flex items-center">
                <Separator />
                <span className="absolute left-1/2 top-1/2 bg-card/90 px-3 py-1 rounded-full text-xs text-muted-foreground ring-1 ring-border -translate-x-1/2 -translate-y-1/2">
                  or
                </span>
              </div>
              <Button variant="outline" className="w-full text-base font-semibold py-3" size="lg" asChild>
                <Link to="/register">Create Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-10 md:py-16">
        <h1 className="text-4xl font-extrabold bg-gradient-to-tr from-blue-400 to-fuchsia-500 bg-clip-text text-transparent mb-8 tracking-tight text-center">
          My Account
        </h1>
        <div className="mt-4 grid gap-6 md:grid-cols-2 xl:grid-cols-4 md:gap-8">
          {features.map((item) => (
            <Link
              key={item.title}
              to={item.to}
              className={`flex flex-col items-center gap-3 rounded-2xl border border-border bg-card/80 p-8 shadow hover:shadow-lg transition-all hover:scale-[1.03] hover:bg-gradient-to-b from-secondary/30 to-card/60 group cursor-pointer`}
              tabIndex={0}
            >
              <div className={`rounded-xl p-4 ${item.color} flex items-center justify-center transition-all shadow group-hover:scale-105`}>
                {item.icon}
              </div>
              <div className="w-full text-center mt-2">
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </Link>
          ))}
          <button
            className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card/80 p-8 shadow hover:shadow-lg transition-all hover:scale-[1.03] hover:bg-gradient-to-b from-red-100/60 to-card/70 group outline-none focus-visible:ring-2 ring-red-500 cursor-pointer"
            aria-label="Sign Out"
            tabIndex={0}
            type="button"
            onClick={() => {/* Add sign out logic here */}}
          >
            <div className="rounded-xl p-4 bg-red-100 dark:bg-red-900/20 flex items-center justify-center transition-all shadow group-hover:scale-105">
              <LogOut className="h-7 w-7 text-red-500" />
            </div>
            <div className="w-full text-center mt-2">
              <h3 className="font-bold text-lg mb-1">Sign Out</h3>
              <p className="text-xs text-muted-foreground">Log out of account</p>
            </div>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
