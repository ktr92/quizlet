const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function seedWords() {
  try {
    await prisma.courses.create({
      data: {},
    })
  } catch (error) {
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}

seedWords()
