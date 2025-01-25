import { Account, User } from "@prisma/client";

export type UserWithAccounts = User & {
  accounts: Account[];
};
