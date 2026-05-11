import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, password, role = "customer" } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user and potentially a vendor in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: role as string,
        },
      });

      if (role === "vendor") {
        const slug = name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");

        const vendor = await tx.vendor.create({
          data: {
            userId: user.id,
            name,
            slug,
            email,
            status: "pending",
          },
        });

        return { user, vendor, requiresApproval: true };
      }

      return { user, vendor: null, requiresApproval: false };
    });

    // Generate token if no approval required
    const token = result.requiresApproval 
      ? null 
      : Buffer.from(JSON.stringify({ userId: result.user.id, email: result.user.email })).toString("base64");

    return res.status(201).json({
      message: result.requiresApproval 
        ? "Registration successful. Awaiting approval." 
        : "Registration successful.",
      requiresApproval: result.requiresApproval,
      user: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
        role: result.user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}