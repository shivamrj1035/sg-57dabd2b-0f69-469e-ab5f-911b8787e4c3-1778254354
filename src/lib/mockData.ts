import { User, Vendor, Product } from "@/types";

// In-memory store for server-side API routes
let serverUsers: User[] | null = null;
let serverVendors: Vendor[] | null = null;
let serverProducts: Product[] | null = null;

// Storage keys for client-side
const USERS_KEY = "mock_users";
const VENDORS_KEY = "mock_vendors";
const PRODUCTS_KEY = "mock_products";

// Check if we're on server or client
const isServer = typeof window === "undefined";

export const mockDB = {
  // Users
  getUsers(): User[] {
    if (isServer) {
      if (!serverUsers) {
        serverUsers = this.getDefaultUsers();
      }
      return serverUsers;
    }
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : this.getDefaultUsers();
  },

  saveUsers(users: User[]) {
    if (isServer) {
      serverUsers = users;
      return;
    }
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  getUserByEmail(email: string): User | undefined {
    return this.getUsers().find((u) => u.email === email);
  },

  getUserById(id: string): User | undefined {
    return this.getUsers().find((u) => u.id === id);
  },

  createUser(user: Omit<User, "id" | "createdAt" | "updatedAt">): User {
    const users = this.getUsers();
    const newUser: User = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    users.push(newUser);
    this.saveUsers(users);
    return newUser;
  },

  updateUser(id: string, updates: Partial<User>): User | null {
    const users = this.getUsers();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return null;

    users[index] = { ...users[index], ...updates, updatedAt: new Date() };
    this.saveUsers(users);
    return users[index];
  },

  deleteUser(id: string): boolean {
    const users = this.getUsers();
    const filtered = users.filter((u) => u.id !== id);
    if (filtered.length === users.length) return false;
    this.saveUsers(filtered);
    return true;
  },

  // Vendors
  getVendors(): Vendor[] {
    if (isServer) {
      if (!serverVendors) {
        serverVendors = this.getDefaultVendors();
      }
      return serverVendors;
    }
    const data = localStorage.getItem(VENDORS_KEY);
    return data ? JSON.parse(data) : this.getDefaultVendors();
  },

  saveVendors(vendors: Vendor[]) {
    if (isServer) {
      serverVendors = vendors;
      return;
    }
    localStorage.setItem(VENDORS_KEY, JSON.stringify(vendors));
  },

  getVendorById(id: string): Vendor | undefined {
    return this.getVendors().find((v) => v.id === id);
  },

  getVendorBySlug(slug: string): Vendor | undefined {
    return this.getVendors().find((v) => v.slug === slug);
  },

  createVendor(vendor: Omit<Vendor, "id" | "createdAt" | "updatedAt">): Vendor {
    const vendors = this.getVendors();
    const newVendor: Vendor = {
      ...vendor,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    vendors.push(newVendor);
    this.saveVendors(vendors);
    return newVendor;
  },

  updateVendor(id: string, updates: Partial<Vendor>): Vendor | null {
    const vendors = this.getVendors();
    const index = vendors.findIndex((v) => v.id === id);
    if (index === -1) return null;

    vendors[index] = { ...vendors[index], ...updates, updatedAt: new Date() };
    this.saveVendors(vendors);
    return vendors[index];
  },

  deleteVendor(id: string): boolean {
    const vendors = this.getVendors();
    const filtered = vendors.filter((v) => v.id !== id);
    if (filtered.length === vendors.length) return false;
    this.saveVendors(filtered);
    return true;
  },

  // Products
  getProducts(): Product[] {
    if (isServer) {
      if (!serverProducts) {
        serverProducts = this.getDefaultProducts();
      }
      return serverProducts;
    }
    const data = localStorage.getItem(PRODUCTS_KEY);
    return data ? JSON.parse(data) : this.getDefaultProducts();
  },

  saveProducts(products: Product[]) {
    if (isServer) {
      serverProducts = products;
      return;
    }
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  },

  getProductById(id: string): Product | undefined {
    return this.getProducts().find((p) => p.id === id);
  },

  getProductsByVendorId(vendorId: string): Product[] {
    return this.getProducts().filter((p) => p.vendorId === vendorId);
  },

  createProduct(product: Omit<Product, "id" | "createdAt" | "updatedAt">): Product {
    const products = this.getProducts();
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    products.push(newProduct);
    this.saveProducts(products);
    return newProduct;
  },

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const products = this.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    products[index] = { ...products[index], ...updates, updatedAt: new Date() };
    this.saveProducts(products);
    return products[index];
  },

  deleteProduct(id: string): boolean {
    const products = this.getProducts();
    const filtered = products.filter((p) => p.id !== id);
    if (filtered.length === products.length) return false;
    this.saveProducts(filtered);
    return true;
  },

  // Default data
  getDefaultUsers(): User[] {
    return [
      {
        id: "1",
        email: "admin@platform.com",
        name: "Super Admin",
        role: "super_admin",
        createdAt: new Date("2026-01-01"),
        updatedAt: new Date("2026-01-01"),
      },
      {
        id: "2",
        email: "vendor@example.com",
        name: "Demo Vendor",
        role: "vendor",
        vendorId: "vendor-1",
        createdAt: new Date("2026-01-01"),
        updatedAt: new Date("2026-01-01"),
      },
    ];
  },

  getDefaultVendors(): Vendor[] {
    return [
      {
        id: "vendor-1",
        name: "Demo Shop",
        slug: "demo-shop",
        email: "vendor@example.com",
        phone: "+1234567890",
        status: "active",
        logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=200&fit=crop",
        banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop",
        about: "Welcome to our demo shop! We offer a curated selection of quality products with fast delivery and excellent customer service.",
        address: "123 Main St, City, State 12345",
        businessHours: "Mon-Sat: 9:00 AM - 8:00 PM, Sun: 10:00 AM - 6:00 PM",
        facebook: "https://facebook.com/demoshop",
        instagram: "https://instagram.com/demoshop",
        twitter: "https://twitter.com/demoshop",
        primaryColor: "#3b82f6",
        secondaryColor: "#64748b",
        createdAt: new Date("2026-01-01"),
        updatedAt: new Date("2026-01-01"),
      },
    ];
  },

  getDefaultProducts(): Product[] {
    return [
      {
        id: "product-1",
        vendorId: "vendor-1",
        name: "Premium Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation, 30-hour battery life, and crystal-clear sound quality. Perfect for music lovers and professionals.",
        price: 149.99,
        discountPrice: 129.99,
        category: "Electronics",
        images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop"],
        stockStatus: "in_stock",
        stockQuantity: 25,
        views: 145,
        createdAt: new Date("2026-01-15"),
        updatedAt: new Date("2026-01-15"),
      },
      {
        id: "product-2",
        vendorId: "vendor-1",
        name: "Smart Watch Pro",
        description: "Feature-packed smartwatch with fitness tracking, heart rate monitor, GPS, and smartphone notifications. Water-resistant up to 50m.",
        price: 299.99,
        category: "Electronics",
        images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop"],
        stockStatus: "in_stock",
        stockQuantity: 15,
        views: 98,
        createdAt: new Date("2026-01-20"),
        updatedAt: new Date("2026-01-20"),
      },
      {
        id: "product-3",
        vendorId: "vendor-1",
        name: "Leather Messenger Bag",
        description: "Handcrafted genuine leather messenger bag with multiple compartments. Perfect for work or travel. Fits up to 15-inch laptop.",
        price: 189.99,
        discountPrice: 159.99,
        category: "Accessories",
        images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop"],
        stockStatus: "low_stock",
        stockQuantity: 5,
        views: 67,
        createdAt: new Date("2026-02-01"),
        updatedAt: new Date("2026-02-01"),
      },
      {
        id: "product-4",
        vendorId: "vendor-1",
        name: "Minimalist Desk Lamp",
        description: "Modern LED desk lamp with adjustable brightness and color temperature. USB-C rechargeable with 10-hour battery life.",
        price: 79.99,
        category: "Home & Office",
        images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=800&fit=crop"],
        stockStatus: "in_stock",
        stockQuantity: 30,
        views: 54,
        createdAt: new Date("2026-02-05"),
        updatedAt: new Date("2026-02-05"),
      },
      {
        id: "product-5",
        vendorId: "vendor-1",
        name: "Stainless Steel Water Bottle",
        description: "Insulated stainless steel water bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free, 32oz capacity.",
        price: 34.99,
        category: "Sports & Outdoors",
        images: ["https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop"],
        stockStatus: "out_of_stock",
        stockQuantity: 0,
        views: 89,
        createdAt: new Date("2026-02-10"),
        updatedAt: new Date("2026-02-10"),
      },
    ];
  },

  // Initialize with default data
  initialize() {
    if (isServer) {
      if (!serverUsers) serverUsers = this.getDefaultUsers();
      if (!serverVendors) serverVendors = this.getDefaultVendors();
      if (!serverProducts) serverProducts = this.getDefaultProducts();
    } else {
      if (!localStorage.getItem(USERS_KEY)) {
        this.saveUsers(this.getDefaultUsers());
      }
      if (!localStorage.getItem(VENDORS_KEY)) {
        this.saveVendors(this.getDefaultVendors());
      }
      if (!localStorage.getItem(PRODUCTS_KEY)) {
        this.saveProducts(this.getDefaultProducts());
      }
    }
  },
};