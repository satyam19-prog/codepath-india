import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isAdmin = String(email || "").toLowerCase().endsWith("@codepath.in");

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.json({ success: false, message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashed, isAdmin }
    });

    res.json({ success: true, message: "Registration successful", user: { id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
  } catch (error) {
    console.error("register error:", error);
    res.status(500).json({ success: false, message: "Registration failed", error: error?.message || error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.json({ success: false, message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ success: true, token });
  } catch (error) {
    console.error("login error:", error);
    res.status(500).json({ success: false, message: "Login failed", error: error?.message || error });
  }
};


export const me = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, name: true, email: true, isAdmin: true },
    });

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, user });
  } catch (error) {
    console.error("me error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch user", error: error?.message || error });
  }
};