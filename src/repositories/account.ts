import { Prisma } from "@prisma/client";
import { Account as NextAuthAccount } from "next-auth";

import { prisma } from "#/libs/prisma";

export const createAccount = async (
  data: NextAuthAccount & {
    userId: string;
  }
) => {
  await prisma.account.create(
    Prisma.validator<Prisma.AccountCreateArgs>()({
      data: {
        access_token: data.access_token,
        scope: data.scope,
        token_type: data.token_type,
        id_token: data.id_token,
        expires_at: data.expires_at,
        provider: data.provider,
        type: data.type,
        providerAccountId: data.providerAccountId,
        userId: data.userId,
      },
    })
  );
};
