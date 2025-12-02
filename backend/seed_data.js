import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding data...");

    // Create some users
    const users = [
        { name: "Alice Coder", email: "alice@example.com", role: "student", solved: 15, streak: 5, rating: 1350 },
        { name: "Bob Builder", email: "bob@example.com", role: "student", solved: 10, streak: 2, rating: 1280 },
        { name: "Charlie Dev", email: "charlie@example.com", role: "student", solved: 25, streak: 12, rating: 1450 },
        { name: "David Algo", email: "david@example.com", role: "student", solved: 5, streak: 1, rating: 1220 },
        { name: "Eve Hacker", email: "eve@example.com", role: "student", solved: 30, streak: 15, rating: 1500 },
    ];

    for (const u of users) {
        const hashedPassword = await bcrypt.hash("password123", 10);

        // Upsert user
        const user = await prisma.user.upsert({
            where: { email: u.email },
            update: {},
            create: {
                name: u.name,
                email: u.email,
                password: hashedPassword,
                role: u.role,
            },
        });

        // Upsert progress
        await prisma.userProgress.upsert({
            where: { userId: user.id },
            update: {
                solved: u.solved,
                streak: u.streak,
                rating: u.rating,
            },
            create: {
                userId: user.id,
                solved: u.solved,
                streak: u.streak,
                rating: u.rating,
            },
        });

        console.log(`Seeded user: ${u.name}`);
    }

    console.log("Seeding complete!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
