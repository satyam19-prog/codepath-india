import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    const email = "admin@example.com";
    const password = "password123";
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            password: hashedPassword,
            role: "admin",
            isAdmin: true
        },
        create: {
            email,
            name: "Admin User",
            password: hashedPassword,
            role: "admin",
            isAdmin: true
        }
    });

    console.log(`Admin user ${email} configured with password: ${password}`);
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
