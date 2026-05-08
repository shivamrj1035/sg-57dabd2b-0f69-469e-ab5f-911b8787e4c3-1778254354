import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Store, MessageCircle, ArrowLeft, Share2, Package, Phone, ShoppingBag, Store as StoreIcon } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Vendor, Product, StockStatus } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { Product3DViewer } from "@/components/3D/Product3DViewer";

export default function ProductDetailPage() {
  const router = useRouter();
  const { vendorSlug, productId } = router.query;
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (vendorSlug && productId) {
      loadProductData();
    }
  }, [vendorSlug, productId]);

  const loadProductData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/store/${vendorSlug}`);

      if (!response.ok) {
        setError("Store not found");
        return;
      }

      const data = await response.json();
      const foundProduct = data.products.find((p: Product) => p.id === productId);

      if (!foundProduct) {
        setError("Product not found");
        return;
      }

      setVendor(data.vendor);
      setProduct(foundProduct);
    } catch (error) {
      setError("Failed to load product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppOrder = () => {
    if (!vendor?.whatsappNumber || !product) return;

    const message = `Hi! I'm interested in ordering:\n\n*${product.name}*\nPrice: $${product.price.toFixed(2)}\n\nCan you provide more details?`;
    const url = `https://wa.me/${vendor.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: `Check out ${product?.name} at ${vendor?.name}`,
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      toast({
        title: "Link copied",
        description: "Product link copied to clipboard",
      });
    }
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !vendor || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Package className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-heading font-bold mb-2">Product Not Found</h1>
        <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
        <Button asChild>
          <Link href={`/store/${vendorSlug}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Store
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${product.name} - ${vendor.name}`}
        description={product.description}
        image={product.images[0]}
      />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button asChild variant="ghost" size="sm">
                <Link href={`/store/${vendorSlug}`}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Store
                </Link>
              </Button>
              <div className="flex items-center gap-3">
                {vendor.logo ? (
                  <img src={vendor.logo} alt={vendor.name} className="h-8 w-8 rounded object-cover" />
                ) : (
                  <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
                    <Store className="h-4 w-4 text-primary" />
                  </div>
                )}
                <span className="font-heading font-semibold">{vendor.name}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Product Details */}
        <div className="container mx-auto px-4 py-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          >
            {/* Images */}
            <div className="space-y-4">
              {/* 3D Preview Option */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg overflow-hidden shadow-lg mb-4"
              >
                <Product3DViewer imageUrl={product.images[selectedImage]} autoRotate={true} />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="aspect-square bg-muted rounded-lg overflow-hidden shadow-lg"
              >
                {product.images.length > 0 ? (
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="h-24 w-24 text-muted-foreground" />
                  </div>
                )}
              </motion.div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? "border-primary" : "border-transparent"
                      }`}
                    >
                      <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-3xl font-heading font-bold">{product.name}</h1>
                  <Button variant="ghost" size="sm" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary">{product.category}</Badge>
                  {getStockBadge(product.stockStatus)}
                  {product.featured && <Badge className="bg-primary">Featured</Badge>}
                </div>
              </div>

              <div className="flex items-baseline gap-3">
                <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
                {product.discountPrice && (
                  <p className="text-xl text-muted-foreground line-through">
                    ${product.discountPrice.toFixed(2)}
                  </p>
                )}
              </div>

              <Separator />

              <div>
                <h2 className="font-heading font-semibold mb-2">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              {product.sku && (
                <div>
                  <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                </div>
              )}

              <Separator />

              <div className="space-y-3">
                <Button
                  onClick={handleWhatsAppOrder}
                  size="lg"
                  className="w-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
                  disabled={product.stockStatus === "out_of_stock"}
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Order on WhatsApp
                </Button>
                {product.stockStatus === "out_of_stock" && (
                  <p className="text-sm text-center text-muted-foreground">
                    This product is currently out of stock
                  </p>
                )}
              </div>

              {/* Vendor Info Card */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h3 className="font-heading font-semibold mb-3">Sold by</h3>
                  <div className="flex items-center gap-3 mb-3">
                    {vendor.logo ? (
                      <img src={vendor.logo} alt={vendor.name} className="h-10 w-10 rounded object-cover" />
                    ) : (
                      <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                        <Store className="h-5 w-5 text-primary" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{vendor.name}</p>
                      {vendor.phone && (
                        <p className="text-xs text-muted-foreground">{vendor.phone}</p>
                      )}
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={`/store/${vendorSlug}`}>
                      View All Products
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}