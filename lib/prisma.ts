// Only import and create Prisma client if DATABASE_URL is available
let prisma: any = null

if (process.env.DATABASE_URL) {
  const { PrismaClient } = require('@prisma/client')
  
  const globalForPrisma = globalThis as unknown as {
    prisma: any | undefined
  }

  prisma = globalForPrisma.prisma ?? new PrismaClient()

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
  }
}

export { prisma }
