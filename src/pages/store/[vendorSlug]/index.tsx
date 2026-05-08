import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Store, MessageCircle, Search, MapPin, Clock, Phone, Mail } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Vendor, Product, StockStatus } from "@/types";

export default function StorefrontPage() {
  const router = useRouter();
  const { vendorSlug } = router.query;
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (vendorSlug) {
      loadStoreData();
    }
  }, [vendorSlug]);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, selectedCategory, products]);

  const loadStoreData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/store/${vendorSlug}`);

      if (!response.ok) {
        if (response.status === 404) {
          setError("Store not found");
        } else {
          setError("Failed to load store");
        }
        return;
      }

      const data = await response.json();
      setVendor(data.vendor);
      setProducts(data.products);
      setFilteredProducts(data.products);
    } catch (error) {
      setError("Failed to load store");
    } finally {
      setIsLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  };

  const getCategories = () => {
    const categories = new Set(products.map((p) => p.category));
    return Array.from(categories).sort();
  };

  const getStockBadge = (status: StockStatus) => {
    const variants: Record<StockStatus, { label: string; className: string }> = {
      in_stock: { label: "In Stock", className: "bg-accent/10 text-accent" },
      low_stock: { label: "Low Stock", className: "bg-yellow-500/10 text-yellow-600" },
      out_of_stock: { label: "Out of Stock", className: "bg-destructive/10 text-destructive" },
    };
    const variant = variants[status];
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const handleWhatsAppContact = () => {
    if (!vendor?.whatsappNumber) return;
    const message = `Hi! I'm interested in your products at ${vendor.name}`;
    const url = `https://wa.me/${vendor.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !vendor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Store className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-heading font-bold mb-2">Store Not Found</h1>
        <p className="text-muted-foreground mb-6">The store you're looking for doesn't exist or is not available.</p>
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${vendor.name} - Online Store`}
        description={vendor.about || `Shop products from ${vendor.name}`}
      />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {vendor.logo ? (
                  <img src={vendor.logo} alt={vendor.name} className="h-10 w-10 rounded-lg object-cover" />
                ) : (
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Store className="h-5 w-5 text-primary" />
                  </div>
                )}
                <div>
                  <h1 className="text-xl font-heading font-bold">{vendor.name}</h1>
                  {vendor.phone && (
                    <p className="text-xs text-muted-foreground">{vendor.phone}</p>
                  )}
                </div>
              </div>
              {vendor.whatsappNumber && (
                <Button onClick={handleWhatsAppContact} size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact on WhatsApp
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Banner */}
        {vendor.banner && (
          <div className="w-full h-48 md:h-64 overflow-hidden">
            <img src={vendor.banner} alt={vendor.name} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Store Info */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {vendor.about && (
                <div>
                  <h3 className="font-heading font-semibold text-sm mb-1">About</h3>
                  <p className="text-sm text-muted-foreground">{vendor.about}</p>
                </div>
              )}
              {vendor.address && (
                <div>
                  <h3 className="font-heading font-semibold text-sm mb-1 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Address
                  </h3>
                  <p className="text-sm text-muted-foreground">{vendor.address}</p>
                </div>
              )}
              {vendor.businessHours && (
                <div>
                  <h3 className="font-heading font-semibold text-sm mb-1 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Business Hours
                  </h3>
                  <p className="text-sm text-muted-foreground">{vendor.businessHours}</p>
                </div>
              )}
              <div>
                <h3 className="font-heading font-semibold text-sm mb-1">Contact</h3>
                <div className="space-y-1">
                  {vendor.phone && (
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Phone className="h-3 w-3" />
                      {vendor.phone}
                    </p>
                  )}
                  {vendor.email && (
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Mail className="h-3 w-3" />
                      {vendor.email}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {getCategories().map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Store className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchQuery || selectedCategory !== "all"
                  ? "No products found matching your filters"
                  : "No products available yet"}
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={`/store/${vendorSlug}/products/${product.id}`}>
                    <div className="aspect-square bg-muted relative overflow-hidden">
                      {product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Store className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                      {product.featured && (
                        <Badge className="absolute top-2 right-2 bg-primary">Featured</Badge>
                      )}
                    </div>
                  </Link>
                  <CardContent className="p-4">
                    <Link href={`/store/${vendorSlug}/products/${product.id}`}>
                      <h3 className="font-heading font-semibold mb-1 hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
                        {product.discountPrice && (
                          <p className="text-sm text-muted-foreground line-through">
                            ${product.discountPrice.toFixed(2)}
                          </p>
                        )}
                      </div>
                      {getStockBadge(product.stockStatus)}
                    </div>
                    <Button asChild size="sm" className="w-full" disabled={product.stockStatus === "out_of_stock"}>
                      <Link href={`/store/${vendorSlug}/products/${product.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="border-t py-6 mt-12">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 {vendor.name}. Powered by VendorHub.</p>
          </div>
        </footer>
      </div>
    </>
  );
}