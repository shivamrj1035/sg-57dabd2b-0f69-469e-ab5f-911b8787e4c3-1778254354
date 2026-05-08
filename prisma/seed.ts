import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

async function main() {
  console.log("Starting database seed...");

  // Create Super Admin
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@platform.com" },
    update: {},
    create: {
      email: "admin@platform.com",
      password: adminPassword,
      name: "Platform Admin",
      role: "super_admin",
    },
  });
  console.log("✓ Created admin user");

  // Create Demo Vendor User
  const vendorPassword = await bcrypt.hash("admin123", 10);
  const vendorUser = await prisma.user.upsert({
    where: { email: "vendor@example.com" },
    update: {},
    create: {
      email: "vendor@example.com",
      password: vendorPassword,
      name: "Demo Vendor",
      role: "vendor",
    },
  });
  console.log("✓ Created vendor user");

  // Create Demo Vendor
  const vendor = await prisma.vendor.upsert({
    where: { slug: "demo-shop" },
    update: {},
    create: {
      userId: vendorUser.id,
      slug: "demo-shop",
      name: "Demo Shop",
      email: "vendor@example.com",
      phone: "+1234567890",
      whatsappNumber: "+1234567890",
      status: "approved",
      logo: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=200&h=200&fit=crop",
      banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop",
      about: "Your one-stop shop for quality products at great prices. We pride ourselves on excellent customer service and fast delivery.",
      address: "123 Main St, City, State 12345",
      businessHours: "Mon-Sat: 9:00 AM - 8:00 PM, Sun: 10:00 AM - 6:00 PM",
      facebook: "https://facebook.com/demoshop",
      instagram: "https://instagram.com/demoshop",
      twitter: "https://twitter.com/demoshop",
      primaryColor: "#6366f1",
      secondaryColor: "#8b5cf6",
    },
  });
  console.log("✓ Created demo vendor");

  // Create Sample Products
  const products = [
    {
      name: "Wireless Headphones",
      slug: "wireless-headphones",
      description: "Premium wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
      price: 149.99,
      discountPrice: 129.99,
      category: "Electronics",
      images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop"],
      stockStatus: "in_stock",
      quantity: 25,
      sku: "WH-001",
      featured: true,
    },
    {
      name: "Smart Watch Pro",
      slug: "smart-watch-pro",
      description: "Advanced fitness tracking, heart rate monitoring, and smartphone notifications. Water resistant up to 50m.",
      price: 299.99,
      category: "Electronics",
      images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop"],
      stockStatus: "in_stock",
      quantity: 15,
      sku: "SW-002",
      featured: true,
    },
    {
      name: "Leather Backpack",
      slug: "leather-backpack",
      description: "Handcrafted genuine leather backpack with laptop compartment. Perfect for work or travel.",
      price: 189.99,
      discountPrice: 159.99,
      category: "Accessories",
      images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop"],
      stockStatus: "low_stock",
      quantity: 5,
      sku: "LB-003",
      featured: false,
    },
    {
      name: "Desk Organizer Set",
      slug: "desk-organizer-set",
      description: "Modern bamboo desk organizer set. Includes pen holder, phone stand, and storage compartments.",
      price: 79.99,
      category: "Home & Office",
      images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=800&fit=crop"],
      stockStatus: "in_stock",
      quantity: 30,
      sku: "DO-004",
      featured: false,
    },
    {
      name: "Yoga Mat Premium",
      slug: "yoga-mat-premium",
      description: "Eco-friendly yoga mat with excellent grip and cushioning. Includes carrying strap.",
      price: 34.99,
      category: "Sports & Outdoors",
      images: ["https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop"],
      stockStatus: "out_of_stock",
      quantity: 0,
      sku: "YM-005",
      featured: false,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { 
        vendorId_slug: {
          vendorId: vendor.id,
          slug: product.slug
        }
      },
      update: {},
      create: {
        ...product,
        vendorId: vendor.id,
      },
    });
  }
  console.log("✓ Created sample products");

  console.log("\n✅ Database seeded successfully!");
  console.log("\nDemo Credentials:");
  console.log("Admin: admin@platform.com / admin123");
  console.log("Vendor: vendor@example.com / admin123");
  console.log("Visit: /store/demo-shop");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });