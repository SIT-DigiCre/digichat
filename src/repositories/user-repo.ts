import { Prisma, PrismaClient, PrismaPromise, User } from "@prisma/client";

export class UsersRepository {
  private readonly prisma: PrismaClient | Prisma.TransactionClient;

  constructor(prisma: PrismaClient | Prisma.TransactionClient) {
    this.prisma = prisma;
  }

  getUserById(id: string): PrismaPromise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
