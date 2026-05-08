import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, Package, Users, TrendingUp } from "lucide-react";
import { SEO } from "@/components/SEO";
import { mockDB } from "@/lib/mockData";
import { Vendor } from "@/types";

export default function AdminDashboardPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [stats, setStats] = useState({
    totalVendors: 0,
    activeVendors: 0,
    pendingVendors: 0,
    totalProducts: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    const allVendors = mockDB.getVendors();
    const allProducts = mockDB.getProducts();

    setVendors(allVendors);
    setStats({
      totalVendors: allVendors.length,
      activeVendors: allVendors.filter((v) => v.status === "active").length,
      pendingVendors: allVendors.filter((v) => v.status === "pending").length,
      totalProducts: allProducts.length,
    });
  };

  return (
    <ProtectedRoute allowedRoles={["super_admin"]}>
      <SEO title="Admin Dashboard - VendorHub" description="Platform administration dashboard" />
      <AdminLayout>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-heading font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Platform overview and statistics</p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
                <Store className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalVendors}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.pendingVendors} pending approval
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeVendors}</div>
                <p className="text-xs text-muted-foreground">
                  Currently selling
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalProducts}</div>
                <p className="text-xs text-muted-foreground">
                  Across all vendors
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingVendors}</div>
                <p className="text-xs text-muted-foreground">
                  Awaiting review
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Vendors */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Vendors</CardTitle>
              <CardDescription>Latest vendor registrations</CardDescription>
            </CardHeader>
            <CardContent>
              {vendors.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No vendors yet. New registrations will appear here.
                </p>
              ) : (
                <div className="space-y-4">
                  {vendors.slice(0, 5).map((vendor) => (
                    <div
                      key={vendor.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{vendor.name}</p>
                        <p className="text-sm text-muted-foreground">{vendor.email}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          vendor.status === "active"
                            ? "bg-accent/10 text-accent"
                            : vendor.status === "pending"
                            ? "bg-yellow-500/10 text-yellow-600"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {vendor.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}