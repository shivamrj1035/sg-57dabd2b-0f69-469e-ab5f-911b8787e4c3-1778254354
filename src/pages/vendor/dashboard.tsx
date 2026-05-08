import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { VendorLayout } from "@/components/layouts/VendorLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, TrendingUp, AlertTriangle, Plus } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useAuth } from "@/contexts/AuthContext";
import { mockDB } from "@/lib/mockData";
import { Product } from "@/types";
import Link from "next/link";

export default function VendorDashboardPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    inStock: 0,
    lowStock: 0,
    outOfStock: 0,
    totalViews: 0,
  });

  useEffect(() => {
    if (user?.vendorId) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = () => {
    if (!user?.vendorId) return;

    const vendorProducts = mockDB.getProductsByVendorId(user.vendorId);
    setProducts(vendorProducts);

    const totalViews = vendorProducts.reduce((sum, p) => sum + (p.views || 0), 0);
    
    setStats({
      totalProducts: vendorProducts.length,
      inStock: vendorProducts.filter((p) => p.stockStatus === "in_stock").length,
      lowStock: vendorProducts.filter((p) => p.stockStatus === "low_stock").length,
      outOfStock: vendorProducts.filter((p) => p.stockStatus === "out_of_stock").length,
      totalViews,
    });
  };

  return (
    <ProtectedRoute allowedRoles={["vendor"]}>
      <SEO title="Dashboard - VendorHub" description="Vendor dashboard" />
      <VendorLayout>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user?.name}</p>
            </div>
            <Button asChild>
              <Link href="/vendor/products?action=create">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Link>
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalProducts}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.inStock} in stock
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalViews}</div>
                <p className="text-xs text-muted-foreground">
                  Product page visits
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.lowStock}</div>
                <p className="text-xs text-muted-foreground">
                  Needs attention
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
                <Package className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.outOfStock}</div>
                <p className="text-xs text-muted-foreground">
                  Currently unavailable
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Button asChild variant="outline" className="h-auto py-4 flex-col items-start">
                  <Link href="/vendor/products?action=create">
                    <Plus className="h-5 w-5 mb-2" />
                    <span className="font-medium">Add New Product</span>
                    <span className="text-xs text-muted-foreground">Create product listing</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto py-4 flex-col items-start">
                  <Link href="/vendor/products">
                    <Package className="h-5 w-5 mb-2" />
                    <span className="font-medium">Manage Products</span>
                    <span className="text-xs text-muted-foreground">Edit your catalog</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto py-4 flex-col items-start">
                  <Link href="/vendor/customize">
                    <Package className="h-5 w-5 mb-2" />
                    <span className="font-medium">Customize Store</span>
                    <span className="text-xs text-muted-foreground">Brand your storefront</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Products */}
          {products.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Products</CardTitle>
                <CardDescription>Your latest product listings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.slice(0, 5).map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          product.stockStatus === "in_stock"
                            ? "bg-accent/10 text-accent"
                            : product.stockStatus === "low_stock"
                            ? "bg-yellow-500/10 text-yellow-600"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {product.stockStatus.replace("_", " ")}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </VendorLayout>
    </ProtectedRoute>
  );
}