import { Prisma } from "@prisma/client";

import { prisma } from "#/libs/prisma";

export const getUserById = (id: string) => {
  return prisma.user.findUnique(
    Prisma.validator<Prisma.UserFindUniqueArgs>()({
      where: {
        id,
      },
    })
  );
};

export const getUserByEmailWithAccounts = (email: string) => {
  return prisma.user.findUnique(
    Prisma.validator<Prisma.UserFindUniqueArgs>()({
      where: {
        email,
      },
      include: {
        accounts: true,
      },
    })
  );
};
