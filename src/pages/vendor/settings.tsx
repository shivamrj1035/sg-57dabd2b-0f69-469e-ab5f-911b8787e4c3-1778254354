import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { VendorLayout } from "@/components/layouts/VendorLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SEO } from "@/components/SEO";
import { useToast } from "@/hooks/use-toast";
import { Vendor } from "@/types";
import { Save, Image as ImageIcon, Palette, Building } from "lucide-react";

export default function VendorSettings() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [vendor, setVendor] = useState<Vendor | null>(null);

  // Form state
  const [logo, setLogo] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#3b82f6");
  const [secondaryColor, setSecondaryColor] = useState("#8b5cf6");
  const [about, setAbout] = useState("");
  const [businessHours, setBusinessHours] = useState("");
  const [address, setAddress] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");

  useEffect(() => {
    if (!user) return;
    fetchVendorSettings();
  }, [user]);

  const fetchVendorSettings = async () => {
    try {
      const response = await fetch("/api/vendor/settings", {
        headers: {
          "x-vendor-id": user?.id || "",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch settings");

      const data = await response.json();
      setVendor(data);
      
      // Populate form with existing data
      setLogo(data.logo || "");
      setBannerImage(data.bannerImage || "");
      setPrimaryColor(data.primaryColor || "#3b82f6");
      setSecondaryColor(data.secondaryColor || "#8b5cf6");
      setAbout(data.about || "");
      setBusinessHours(data.businessHours || "");
      setAddress(data.address || "");
      setFacebookUrl(data.facebookUrl || "");
      setInstagramUrl(data.instagramUrl || "");
      setTwitterUrl(data.twitterUrl || "");
    } catch (error) {
      console.error("Fetch error:", error);
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "destructive",
      });
    }
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      const updates = {
        logo,
        bannerImage,
        primaryColor,
        secondaryColor,
        about,
        businessHours,
        address,
        facebookUrl,
        instagramUrl,
        twitterUrl,
      };

      const response = await fetch("/api/vendor/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-vendor-id": user?.id || "",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) throw new Error("Failed to save settings");

      toast({
        title: "Success",
        description: "Settings saved successfully",
      });

      fetchVendorSettings();
    } catch (error) {
      console.error("Save error:", error);
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!vendor) {
    return (
      <ProtectedRoute allowedRoles={["vendor"]}>
        <VendorLayout>
          <div className="flex items-center justify-center min-h-screen">
            <p className="text-muted-foreground">Loading settings...</p>
          </div>
        </VendorLayout>
      </ProtectedRoute>
    );
  }

  return (
    <>
      <SEO title="Store Settings" />
      <ProtectedRoute allowedRoles={["vendor"]}>
        <VendorLayout>
          <div className="p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold">Store Settings</h1>
                <p className="text-muted-foreground mt-1">
                  Customize your storefront appearance and business information
                </p>
              </div>
              <Button onClick={handleSaveSettings} disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>

            <Tabs defaultValue="branding" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="branding">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Branding
                </TabsTrigger>
                <TabsTrigger value="theme">
                  <Palette className="h-4 w-4 mr-2" />
                  Theme
                </TabsTrigger>
                <TabsTrigger value="business">
                  <Building className="h-4 w-4 mr-2" />
                  Business Info
                </TabsTrigger>
              </TabsList>

              <TabsContent value="branding" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Store Branding</CardTitle>
                    <CardDescription>
                      Upload your logo and banner image to customize your storefront
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="logo">Logo URL</Label>
                      <Input
                        id="logo"
                        type="text"
                        placeholder="https://example.com/logo.png"
                        value={logo}
                        onChange={(e) => setLogo(e.target.value)}
                      />
                      {logo && (
                        <div className="mt-4 p-4 border rounded-lg">
                          <p className="text-sm text-muted-foreground mb-2">Logo Preview:</p>
                          <img
                            src={logo}
                            alt="Logo preview"
                            className="h-20 w-auto object-contain"
                          />
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="banner">Banner Image URL</Label>
                      <Input
                        id="banner"
                        type="text"
                        placeholder="https://example.com/banner.jpg"
                        value={bannerImage}
                        onChange={(e) => setBannerImage(e.target.value)}
                      />
                      {bannerImage && (
                        <div className="mt-4 p-4 border rounded-lg">
                          <p className="text-sm text-muted-foreground mb-2">Banner Preview:</p>
                          <img
                            src={bannerImage}
                            alt="Banner preview"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="theme" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Theme Colors</CardTitle>
                    <CardDescription>
                      Customize your storefront color scheme
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="primaryColor">Primary Color</Label>
                        <div className="flex gap-4 items-center">
                          <Input
                            id="primaryColor"
                            type="color"
                            value={primaryColor}
                            onChange={(e) => setPrimaryColor(e.target.value)}
                            className="w-20 h-12 cursor-pointer"
                          />
                          <Input
                            type="text"
                            value={primaryColor}
                            onChange={(e) => setPrimaryColor(e.target.value)}
                            placeholder="#3b82f6"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="secondaryColor">Secondary Color</Label>
                        <div className="flex gap-4 items-center">
                          <Input
                            id="secondaryColor"
                            type="color"
                            value={secondaryColor}
                            onChange={(e) => setSecondaryColor(e.target.value)}
                            className="w-20 h-12 cursor-pointer"
                          />
                          <Input
                            type="text"
                            value={secondaryColor}
                            onChange={(e) => setSecondaryColor(e.target.value)}
                            placeholder="#8b5cf6"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-6 border rounded-lg space-y-4">
                      <p className="text-sm font-medium">Color Preview</p>
                      <div className="flex gap-4">
                        <div
                          className="w-32 h-32 rounded-lg border-2"
                          style={{ backgroundColor: primaryColor }}
                        >
                          <div className="h-full flex items-center justify-center text-white text-sm font-medium">
                            Primary
                          </div>
                        </div>
                        <div
                          className="w-32 h-32 rounded-lg border-2"
                          style={{ backgroundColor: secondaryColor }}
                        >
                          <div className="h-full flex items-center justify-center text-white text-sm font-medium">
                            Secondary
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="business" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Business Information</CardTitle>
                    <CardDescription>
                      Update your business details and contact information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="about">About Your Business</Label>
                      <Textarea
                        id="about"
                        placeholder="Tell customers about your business..."
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hours">Business Hours</Label>
                      <Input
                        id="hours"
                        type="text"
                        placeholder="Mon-Fri: 9AM-6PM, Sat: 10AM-4PM"
                        value={businessHours}
                        onChange={(e) => setBusinessHours(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Business Address</Label>
                      <Textarea
                        id="address"
                        placeholder="Enter your business address..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="border-t pt-6 space-y-4">
                      <h3 className="text-lg font-medium">Social Media Links</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="facebook">Facebook URL</Label>
                        <Input
                          id="facebook"
                          type="url"
                          placeholder="https://facebook.com/yourpage"
                          value={facebookUrl}
                          onChange={(e) => setFacebookUrl(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="instagram">Instagram URL</Label>
                        <Input
                          id="instagram"
                          type="url"
                          placeholder="https://instagram.com/yourprofile"
                          value={instagramUrl}
                          onChange={(e) => setInstagramUrl(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="twitter">Twitter/X URL</Label>
                        <Input
                          id="twitter"
                          type="url"
                          placeholder="https://twitter.com/yourhandle"
                          value={twitterUrl}
                          onChange={(e) => setTwitterUrl(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card>
              <CardHeader>
                <CardTitle>Storefront Preview</CardTitle>
                <CardDescription>
                  Preview your storefront at: <span className="font-mono text-primary">/store/{vendor.slug}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  onClick={() => router.push(`/store/${vendor.slug}`)}
                >
                  View Storefront
                </Button>
              </CardContent>
            </Card>
          </div>
        </VendorLayout>
      </ProtectedRoute>
    </>
  );
}