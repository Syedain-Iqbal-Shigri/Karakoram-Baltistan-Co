import { PrismaClient } from '@prisma/client'

// Prevent multiple Prisma instances in development
// Next.js hot reload creates new instances — this singleton pattern fixes that
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma