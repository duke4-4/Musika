import { Link } from "react-router-dom";
import { User, Package, Heart, Settings, LogOut } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Account = () => {
  // This would be replaced with actual auth state
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return (
      <Layout>
        <div className="container py-16">
          <div className="mx-auto max-w-md">
            <div className="text-center mb-8">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                <User className="h-8 w-8 text-muted-foreground" />
              </div>
              <h1 className="text-2xl font-bold">Welcome Back</h1>
              <p className="mt-2 text-muted-foreground">
                Sign in to your account or create a new one
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <Button variant="accent" className="w-full" size="lg" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <div className="relative my-6">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                  or
                </span>
              </div>
              <Button variant="outline" className="w-full" size="lg" asChild>
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
      <div className="container py-8 md:py-12">
        <h1 className="text-3xl font-bold tracking-tight">My Account</h1>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/orders"
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:bg-secondary"
          >
            <div className="rounded-lg bg-secondary p-3">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">Orders</h3>
              <p className="text-sm text-muted-foreground">Track your orders</p>
            </div>
          </Link>

          <Link
            to="/wishlist"
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:bg-secondary"
          >
            <div className="rounded-lg bg-secondary p-3">
              <Heart className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">Wishlist</h3>
              <p className="text-sm text-muted-foreground">Saved items</p>
            </div>
          </Link>

          <Link
            to="/settings"
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:bg-secondary"
          >
            <div className="rounded-lg bg-secondary p-3">
              <Settings className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">Settings</h3>
              <p className="text-sm text-muted-foreground">Account settings</p>
            </div>
          </Link>

          <button className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:bg-secondary text-left">
            <div className="rounded-lg bg-secondary p-3">
              <LogOut className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">Sign Out</h3>
              <p className="text-sm text-muted-foreground">Log out of account</p>
            </div>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
