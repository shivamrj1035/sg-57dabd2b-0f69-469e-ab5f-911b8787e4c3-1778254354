import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, Package, Users, TrendingUp, MessageCircle, Palette, BarChart3 } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function Home() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "super_admin") {
        router.push("/admin/dashboard");
      } else if (user.role === "vendor") {
        router.push("/vendor/dashboard");
      }
    }
  }, [isAuthenticated, user, router]);

  const features = [
    {
      icon: Store,
      title: "Custom Storefronts",
      description: "Create beautiful branded storefronts with your logo, colors, and product catalog"
    },
    {
      icon: Package,
      title: "Product Management",
      description: "Easy-to-use dashboard to manage inventory, pricing, and product details"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Integration",
      description: "Let customers order directly through WhatsApp with pre-filled messages"
    },
    {
      icon: Palette,
      title: "Store Customization",
      description: "Customize colors, fonts, and layout to match your brand identity"
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Track product views, popular items, and customer engagement"
    },
    {
      icon: Users,
      title: "Multi-Vendor Platform",
      description: "Manage multiple vendor accounts from a single admin dashboard"
    }
  ];

  return (
    <>
      <SEO 
        title="VendorHub - Multi-Vendor SaaS Platform"
        description="Create your online storefront and start selling with WhatsApp integration"
      />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
          <div className="container mx-auto px-4 py-20 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-block mb-6"
              >
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  <TrendingUp className="h-4 w-4" />
                  Modern Multi-Vendor Platform
                </div>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
              >
                Launch Your Online Store in Minutes
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl md:text-2xl text-muted-foreground mb-8"
              >
                Create beautiful storefronts, manage products, and sell through WhatsApp — all in one platform
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button asChild size="lg" className="text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow">
                  <Link href="/register">
                    <Store className="h-5 w-5 mr-2" />
                    Start Selling Now
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg">
                  <Link href="/login">
                    Sign In
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Everything You Need to Succeed
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Powerful features designed for local vendors and shop owners
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <CardDescription className="text-base">{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-gradient-to-br from-primary via-secondary to-accent text-white border-none shadow-2xl">
                <CardContent className="p-12 text-center">
                  <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                    Ready to Start Selling?
                  </h2>
                  <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                    Join hundreds of vendors already using VendorHub to grow their business
                  </p>
                  <Button asChild size="lg" variant="secondary" className="text-lg shadow-lg">
                    <Link href="/register">
                      <Store className="h-5 w-5 mr-2" />
                      Create Your Store
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t py-8">
          <div className="container mx-auto px-4">
            <div className="text-center text-muted-foreground">
              <p>&copy; 2026 VendorHub. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}