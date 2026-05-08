import { User, Vendor, Product } from "@/types";

// Mock database using localStorage
const USERS_KEY = "mock_users";
const VENDORS_KEY = "mock_vendors";
const PRODUCTS_KEY = "mock_products";

export const mockDB = {
  // Users
  getUsers(): User[] {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : this.getDefaultUsers();
  },

  saveUsers(users: User[]) {
    if (typeof window === "undefined") return;
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
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(VENDORS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveVendors(vendors: Vendor[]) {
    if (typeof window === "undefined") return;
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
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(PRODUCTS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveProducts(products: Product[]) {
    if (typeof window === "undefined") return;
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
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  },

  // Initialize with default data
  initialize() {
    if (typeof window === "undefined") return;
    
    if (!localStorage.getItem(USERS_KEY)) {
      this.saveUsers(this.getDefaultUsers());
    }
  },
};