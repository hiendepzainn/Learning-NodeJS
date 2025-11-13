import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

//config to get Prisma log at terminal
// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({ log: ["query", "info", "warn", "error"] });

export const prisma = globalForPrisma.prisma || new PrismaClient({ log: [] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
