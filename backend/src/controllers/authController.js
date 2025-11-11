import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.json({ success: false, message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { name, email, password: hashed }
    });

    res.json({ success: true, message: "Registration successful" });
  } catch (error) {
    res.json({ success: false, message: "Registration failed", error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.json({ success: false, message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: "Login failed", error });
  }
};
