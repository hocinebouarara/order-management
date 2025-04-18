import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: LoginFormValues) {
    // In a real app, you would validate credentials with your backend
    console.log(data);

    // Show success toast
    toast.success("Logged in successfully!");

    // Redirect to dashboard after successful login
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex flex-col justify-center w-full px-4 sm:px-6 lg:flex-none lg:w-1/2 xl:w-2/5">
        <div className="w-full max-w-sm mx-auto lg:w-96">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Log in to your account
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-primary hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          className="pl-10"
                          type="email"
                          placeholder="your.email@example.com"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          className="pl-10"
                          type={showPassword ? "text" : "password"}
                          placeholder="Your password"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-1 top-1 h-8 w-8"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-primary hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </form>
          </Form>
        </div>
      </div>

      <div className="hidden lg:block relative w-0 flex-1 bg-gradient-to-br from-primary/20 to-primary/40">
        <div className="absolute inset-0 flex flex-col justify-center items-center p-12">
          <div className="max-w-2xl text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Welcome Back to OrderFlow
            </h2>
            <p className="text-xl text-muted-foreground">
              Sign in to access your dashboard and continue managing your
              business efficiently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
