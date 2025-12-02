import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const email = process.argv[2];
    if (!email) {
        console.log("Please provide an email");
        return;
    }

    try {
        const user = await prisma.user.update({
            where: { email },
            data: { role: "teacher" },
        });
        console.log(`User ${user.email} is now a teacher.`);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
