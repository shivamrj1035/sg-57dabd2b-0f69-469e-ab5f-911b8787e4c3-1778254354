import type { NextApiRequest, NextApiResponse } from "next";
import { mockDB } from "@/lib/mockData";

// Simple password hash simulation (in production, use bcrypt)
const DEMO_PASSWORD = "admin123";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Initialize mock DB
    mockDB.initialize();

    // Find user
    const user = mockDB.getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Simple password check (in production, use bcrypt.compare)
    // For demo: admin@platform.com / admin123
    if (password !== DEMO_PASSWORD) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate simple JWT token (in production, use jsonwebtoken)
    const token = Buffer.from(JSON.stringify({ userId: user.id, email: user.email })).toString("base64");

    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        vendorId: user.vendorId,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}