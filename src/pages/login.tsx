import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, Store } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO title="Login - VendorHub" />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <Store className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-3xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                VendorHub
              </h1>
            </motion.div>
          </div>

          <Card className="shadow-xl border-border/50">
            <form onSubmit={handleSubmit}>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-heading">Welcome back</CardTitle>
                <CardDescription>Enter your credentials to access your dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg"
                  >
                    {error}
                  </motion.div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="vendor@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="bg-muted/50 p-3 rounded-lg text-xs space-y-1">
                  <p className="font-medium text-foreground">Demo Credentials:</p>
                  <p><strong>Admin:</strong> admin@platform.com / admin123</p>
                  <p><strong>Vendor:</strong> vendor@example.com / admin123</p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button 
                  type="submit" 
                  className="w-full shadow-md shadow-primary/25 hover:shadow-primary/40 transition-shadow" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Signing in..."
                  ) : (
                    <>
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </>
                  )}
                </Button>
                <p className="text-sm text-center text-muted-foreground">
                  Don't have an account?{" "}
                  <Link href="/register" className="text-primary hover:underline font-medium">
                    Register as Vendor
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </div>
    </>
  );
}