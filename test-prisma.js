const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  try {
    const user = await prisma.user.findFirst();
    console.log("Successfully connected! Found user:", user?.email);
  } catch (error) {
    console.error("Connection failed:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
