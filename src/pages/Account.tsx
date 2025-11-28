import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Package, Heart, Settings, LogOut, ShieldCheck, CreditCard, Truck } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const profileSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const quickLinks = [
  {
    to: "/orders",
    icon: <Package className="h-6 w-6 text-accent" />,
    title: "Orders",
    desc: "Track and manage recent orders",
  },
  {
    to: "/wishlist",
    icon: <Heart className="h-6 w-6 text-accent" />,
    title: "Wishlist",
    desc: "View and edit saved products",
  },
  {
    to: "/settings",
    icon: <Settings className="h-6 w-6 text-accent" />,
    title: "Settings",
    desc: "Payment methods & preferences",
  },
];

const stats = [
  { icon: <ShieldCheck className="h-6 w-6" />, label: "Account Status", value: "Secure" },
  { icon: <CreditCard className="h-6 w-6" />, label: "Default Payment", value: "Stripe Checkout" },
  { icon: <Truck className="h-6 w-6" />, label: "Delivery Speed", value: "3-5 business days" },
];

const Account = () => {
  const { user, profile, signOut, refreshProfile, isLoading } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        full_name: profile.full_name ?? "",
        phone: profile.phone ?? "",
        address: profile.address ?? "",
        city: profile.city ?? "",
        state: profile.state ?? "",
        zip: profile.zip ?? "",
      });
    }
  }, [form, profile]);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to sign out";
      toast.error(message);
    }
  };

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user) return;
    setIsSaving(true);
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      ...values,
      updated_at: new Date().toISOString(),
    });

    setIsSaving(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Profile updated");
    await refreshProfile();
  };

  if (isLoading || !user) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <span className="text-accent font-semibold animate-pulse">Loading your account...</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-10 md:py-16 space-y-10 animate-fade-in">
        <div className="flex flex-col gap-4">
          <p className="text-muted-foreground">{greeting},</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            {profile?.full_name || user.email}
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Manage your personal information, payment preferences, and keep an eye on every order in real-time.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <Card className="border border-border/60 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Profile details</CardTitle>
              <CardDescription>Keep your contact and delivery information up to date.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="full_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Jane Doe" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="+1 (555) 000-0000" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="123 Main St" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid gap-6 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="New York" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="NY" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="zip"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="10001" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button type="submit" disabled={isSaving} variant="accent">
                      {isSaving ? "Saving..." : "Save changes"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => form.reset()} disabled={isSaving}>
                      Reset
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border border-border/60 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Quick actions</CardTitle>
                <CardDescription>Jump back into your personalized flows.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickLinks.map((link) => (
                  <Link
                    key={link.title}
                    to={link.to}
                    className="flex items-start gap-4 rounded-xl border border-border/60 p-4 hover:border-accent transition-all"
                  >
                    <div className="rounded-full bg-accent/10 p-3">{link.icon}</div>
                    <div>
                      <p className="font-semibold">{link.title}</p>
                      <p className="text-sm text-muted-foreground">{link.desc}</p>
                    </div>
                  </Link>
                ))}
                <Button variant="ghost" className="w-full gap-2 text-destructive" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4" />
                  Sign out
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-border/60 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Account health</CardTitle>
                <CardDescription>Everything looks great. Keep exploring!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center gap-4 rounded-xl border border-border/60 p-4 hover:border-accent transition"
                  >
                    <div className="rounded-full bg-accent/10 p-3 text-accent">{stat.icon}</div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-base font-semibold">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />

        <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-accent/5 to-card/80 p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <p className="text-sm uppercase tracking-widest text-accent font-semibold">Order tracking</p>
              <h2 className="text-2xl font-bold mt-1">Monitor every step in real-time</h2>
              <p className="text-muted-foreground mt-2">
                We connect Stripe payments, Supabase orders, and realtime listeners so you’re never in the dark.
              </p>
            </div>
            <Button asChild variant="accent" size="lg" className="rounded-full">
              <Link to="/orders">Open tracking dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
