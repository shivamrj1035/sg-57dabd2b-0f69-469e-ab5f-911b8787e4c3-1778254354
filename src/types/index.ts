export type UserRole = "super_admin" | "vendor" | "customer";

export type VendorStatus = "pending" | "approved" | "active" | "suspended";

export type StockStatus = "in_stock" | "out_of_stock" | "low_stock";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  vendorId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vendor {
  id: string;
  name: string;
  slug: string;
  email: string;
  phone?: string;
  status: VendorStatus;
  logo?: string;
  banner?: string;
  about?: string;
  address?: string;
  businessHours?: string;
  whatsappNumber?: string;
  primaryColor?: string;
  secondaryColor?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  images: string[];
  stockStatus: StockStatus;
  quantity?: number;
  lowStockThreshold?: number;
  sku?: string;
  featured: boolean;
  views?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  vendorId: string;
  name: string;
  slug: string;
  productCount: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}