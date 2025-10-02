import { PrismaClient } from '../../prisma/generated/prisma';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma: PrismaClient =
	globalForPrisma.prisma ||
	new PrismaClient({
		log: ['error', 'warn'],
	});

if (process.env.NODE_ENV !== 'production') {
	globalForPrisma.prisma = prisma;
}

export async function gracefullyShutdownPrisma(): Promise<void> {
	await prisma.$disconnect();
}
