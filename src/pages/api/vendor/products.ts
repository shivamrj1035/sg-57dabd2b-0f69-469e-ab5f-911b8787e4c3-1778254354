import type { NextApiRequest, NextApiResponse } from "next";
import { mockDB } from "@/lib/mockData";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { vendorId } = req.query;

    if (!vendorId || typeof vendorId !== "string") {
      return res.status(400).json({ message: "Vendor ID is required" });
    }

    if (req.method === "GET") {
      const products = mockDB.getProductsByVendorId(vendorId);
      return res.status(200).json(products);
    }

    if (req.method === "POST") {
      const { name, description, price, discountPrice, category, images, stockStatus, quantity, sku, featured } = req.body;

      if (!name || !description || !price || !category || !stockStatus) {
        return res.status(400).json({ message: "Required fields missing" });
      }

      const product = mockDB.createProduct({
        vendorId,
        name,
        description,
        price: parseFloat(price),
        discountPrice: discountPrice ? parseFloat(discountPrice) : undefined,
        category,
        images: images || [],
        stockStatus,
        quantity: quantity ? parseInt(quantity) : undefined,
        sku: sku || undefined,
        featured: featured || false,
        views: 0,
      });

      return res.status(201).json(product);
    }

    if (req.method === "PUT") {
      const { id, ...updates } = req.body;

      if (!id) {
        return res.status(400).json({ message: "Product ID is required" });
      }

      // Verify product belongs to vendor
      const existingProduct = mockDB.getProductById(id);
      if (!existingProduct || existingProduct.vendorId !== vendorId) {
        return res.status(404).json({ message: "Product not found" });
      }

      const product = mockDB.updateProduct(id, {
        ...updates,
        price: updates.price ? parseFloat(updates.price) : undefined,
        discountPrice: updates.discountPrice ? parseFloat(updates.discountPrice) : undefined,
        quantity: updates.quantity ? parseInt(updates.quantity) : undefined,
      });

      return res.status(200).json(product);
    }

    if (req.method === "DELETE") {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ message: "Product ID is required" });
      }

      // Verify product belongs to vendor
      const existingProduct = mockDB.getProductById(id);
      if (!existingProduct || existingProduct.vendorId !== vendorId) {
        return res.status(404).json({ message: "Product not found" });
      }

      const success = mockDB.deleteProduct(id);

      if (!success) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json({ message: "Product deleted successfully" });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("Products API error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}