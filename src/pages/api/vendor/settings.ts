import type { NextApiRequest, NextApiResponse } from "next";
import { mockDB } from "@/lib/mockData";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const vendorId = req.headers["x-vendor-id"] as string;

    if (!vendorId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.method === "GET") {
      const vendor = mockDB.getVendorById(vendorId);
      if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" });
      }
      return res.status(200).json(vendor);
    }

    if (req.method === "PUT") {
      const updates = req.body;
      const updatedVendor = mockDB.updateVendor(vendorId, updates);
      
      if (!updatedVendor) {
        return res.status(404).json({ message: "Vendor not found" });
      }

      return res.status(200).json(updatedVendor);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("Settings API error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}