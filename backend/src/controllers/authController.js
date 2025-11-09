import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

export async function register(req, res) {
  const { name, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email }});
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { name, email, password: hashed }
    });

    res.json({ message: "Registration successful ✅" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email }});
    if (!user) return res.status(400).json({ message: "Invalid credentials ❌" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials ❌" });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ message: "Login successful ✅", token, user: { id: user.id, name: user.name, email: user.email }});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
