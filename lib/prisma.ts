// Conditional Prisma client - only create if DATABASE_URL exists
let prisma: any = null

try {
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
} catch (error) {
  // Prisma client creation failed - this is expected during build
  console.log('Prisma client not available during build')
}

export { prisma }
