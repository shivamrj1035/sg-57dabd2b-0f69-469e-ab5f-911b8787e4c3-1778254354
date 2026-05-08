import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Hash passwords
  const hashedPassword = await bcrypt.hash("admin123", 10);

  // Create Super Admin
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@platform.com" },
    update: {},
    create: {
      email: "admin@platform.com",
      password: hashedPassword,
      name: "Super Admin",
      role: "super_admin",
      status: "active",
    },
  });

  console.log("✅ Created super admin:", adminUser.email);

  // Create Demo Vendor User
  const vendorUser = await prisma.user.upsert({
    where: { email: "vendor@example.com" },
    update: {},
    create: {
      email: "vendor@example.com",
      password: hashedPassword,
      name: "Demo Vendor",
      role: "vendor",
      status: "active",
    },
  });

  console.log("✅ Created vendor user:", vendorUser.email);

  // Create Demo Vendor Store
  const demoVendor = await prisma.vendor.upsert({
    where: { slug: "demo-shop" },
    update: {},
    create: {
      userId: vendorUser.id,
      slug: "demo-shop",
      name: "Demo Shop",
      email: "vendor@example.com",
      phone: "+1234567890",
      whatsappNumber: "+1234567890",
      logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=200&fit=crop",
      banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop",
      about: "Your one-stop shop for premium products. We offer high-quality items with excellent customer service.",
      address: "123 Main St, City, State 12345",
      businessHours: "Mon-Sat: 9:00 AM - 8:00 PM, Sun: 10:00 AM - 6:00 PM",
      primaryColor: "#6366f1",
      secondaryColor: "#8b5cf6",
      status: "active",
      socialLinks: {
        facebook: "https://facebook.com/demoshop",
        instagram: "https://instagram.com/demoshop",
        twitter: "https://twitter.com/demoshop",
      },
    },
  });

  console.log("✅ Created demo vendor:", demoVendor.name);

  // Create Demo Products
  const products = [
    {
      name: "Premium Wireless Headphones",
      description: "High-quality wireless headphones with active noise cancellation and 30-hour battery life.",
      price: 149.99,
      discountPrice: 129.99,
      category: "Electronics",
      images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop"],
      sku: "WH-001",
      stockStatus: "in_stock",
      quantity: 25,
      featured: true,
    },
    {
      name: "Smart Watch Pro",
      description: "Advanced smartwatch with fitness tracking, heart rate monitor, and GPS.",
      price: 299.99,
      category: "Electronics",
      images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop"],
      sku: "SW-001",
      stockStatus: "in_stock",
      quantity: 15,
      featured: false,
    },
    {
      name: "Leather Backpack",
      description: "Stylish genuine leather backpack with laptop compartment and multiple pockets.",
      price: 189.99,
      discountPrice: 159.99,
      category: "Accessories",
      images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop"],
      sku: "BP-001",
      stockStatus: "low_stock",
      quantity: 5,
      featured: false,
    },
    {
      name: "Ergonomic Office Chair",
      description: "Comfortable office chair with lumbar support and adjustable height.",
      price: 79.99,
      category: "Home & Office",
      images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=800&fit=crop"],
      sku: "CH-001",
      stockStatus: "in_stock",
      quantity: 30,
      featured: false,
    },
    {
      name: "Yoga Mat Pro",
      description: "Premium non-slip yoga mat with carrying strap. Perfect for yoga and fitness.",
      price: 34.99,
      category: "Sports & Outdoors",
      images: ["https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop"],
      sku: "YM-001",
      stockStatus: "out_of_stock",
      quantity: 0,
      featured: false,
    },
  ];

  for (const productData of products) {
    const product = await prisma.product.create({
      data: {
        ...productData,
        vendorId: demoVendor.id,
      },
    });
    console.log("✅ Created product:", product.name);
  }

  console.log("🎉 Seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });