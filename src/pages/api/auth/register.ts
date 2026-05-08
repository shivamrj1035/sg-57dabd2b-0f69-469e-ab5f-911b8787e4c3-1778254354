import type { NextApiRequest, NextApiResponse } from "next";
import { mockDB } from "@/lib/mockData";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    // Initialize mock DB
    mockDB.initialize();

    // Check if user already exists
    const existingUser = mockDB.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create vendor slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Create vendor first
    const vendor = mockDB.createVendor({
      name,
      slug,
      email,
      status: "pending",
    });

    // Create user with vendor role
    const newUser = mockDB.createUser({
      name,
      email,
      role: "vendor",
      vendorId: vendor.id,
    });

    // Return requiresApproval flag
    return res.status(201).json({
      message: "Registration successful. Awaiting approval.",
      requiresApproval: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}