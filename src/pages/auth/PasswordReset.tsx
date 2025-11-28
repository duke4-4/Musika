import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type ResetFormValues = z.infer<typeof schema>;

const PasswordReset = () => {
  const { resetPassword } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const form = useForm<ResetFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: ResetFormValues) => {
    setIsSubmitting(true);
    try {
      await resetPassword(values.email);
      toast.success("Reset instructions sent. Check your inbox.");
      setIsSent(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to send reset email";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center py-10">
        <Card className="w-full max-w-xl border border-border/60 shadow-2xl bg-card/80 backdrop-blur">
          <CardHeader className="space-y-4 text-center">
            <CardTitle className="text-3xl font-black tracking-tight text-foreground">Reset your password</CardTitle>
            <CardDescription className="text-base">
              Enter the email associated with your account and we will send you a reset link.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" type="email" autoComplete="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isSubmitting} className="w-full" size="lg" variant="accent">
                  {isSubmitting ? "Sending instructions..." : "Send reset link"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 text-center text-sm text-muted-foreground">
            {isSent && <p className="text-accent font-semibold">Email sent! Follow the link to set a new password.</p>}
            <p>
              Remembered your password?{" "}
              <Link to="/login" className="text-accent font-semibold hover:underline">
                Go back to sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default PasswordReset;

