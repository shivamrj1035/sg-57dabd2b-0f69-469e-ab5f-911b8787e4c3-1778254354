import type { NextApiRequest, NextApiResponse } from "next";
import { mockDB } from "@/lib/mockData";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const vendors = mockDB.getVendors();
      return res.status(200).json(vendors);
    }

    if (req.method === "POST") {
      const { name, email, slug, status } = req.body;

      if (!name || !email || !slug) {
        return res.status(400).json({ message: "Name, email, and slug are required" });
      }

      // Check if slug already exists
      const existingVendor = mockDB.getVendorBySlug(slug);
      if (existingVendor) {
        return res.status(400).json({ message: "Slug already exists" });
      }

      const vendor = mockDB.createVendor({
        name,
        email,
        slug,
        status: status || "active",
      });

      // Create user for vendor
      mockDB.createUser({
        name,
        email,
        role: "vendor",
        vendorId: vendor.id,
      });

      return res.status(201).json(vendor);
    }

    if (req.method === "PUT") {
      const { id, ...updates } = req.body;

      if (!id) {
        return res.status(400).json({ message: "Vendor ID is required" });
      }

      const vendor = mockDB.updateVendor(id, updates);

      if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" });
      }

      return res.status(200).json(vendor);
    }

    if (req.method === "DELETE") {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ message: "Vendor ID is required" });
      }

      const success = mockDB.deleteVendor(id);

      if (!success) {
        return res.status(404).json({ message: "Vendor not found" });
      }

      // Delete vendor's products
      const products = mockDB.getProductsByVendorId(id);
      products.forEach((p) => mockDB.deleteProduct(p.id));

      // Delete vendor's user
      const users = mockDB.getUsers();
      const vendorUser = users.find((u) => u.vendorId === id);
      if (vendorUser) {
        mockDB.deleteUser(vendorUser.id);
      }

      return res.status(200).json({ message: "Vendor deleted successfully" });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("Vendors API error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}