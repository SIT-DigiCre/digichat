import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

const { NODE_ENV, DB_URL, DB_NAME, JEST_WORKER_ID, TEST_MODE } = process.env;

const _genDbUrl = (jestWorkerId: number): string => {
  return TEST_MODE === "parallel"
    ? DB_URL!.replace(DB_NAME!, `${DB_NAME}${jestWorkerId}`)
    : DB_URL!;
};

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ datasourceUrl: _genDbUrl(Number(JEST_WORKER_ID)) });

if (NODE_ENV != "production") globalForPrisma.prisma = prisma;
