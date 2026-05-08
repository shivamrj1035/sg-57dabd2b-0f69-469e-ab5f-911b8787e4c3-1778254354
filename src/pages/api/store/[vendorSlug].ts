import type { NextApiRequest, NextApiResponse } from "next";
import { mockDB } from "@/lib/mockData";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { vendorSlug } = req.query;

    if (!vendorSlug || typeof vendorSlug !== "string") {
      return res.status(400).json({ message: "Vendor slug is required" });
    }

    if (req.method === "GET") {
      const vendor = mockDB.getVendorBySlug(vendorSlug);

      if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" });
      }

      // Only return active vendors to public
      if (vendor.status !== "active") {
        return res.status(404).json({ message: "Store not available" });
      }

      const products = mockDB.getProductsByVendorId(vendor.id);

      return res.status(200).json({
        vendor,
        products,
      });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("Store API error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}