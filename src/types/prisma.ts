import { Account, User } from "@prisma/client";

export type UserWithAccounts = User & {
  accounts: Account[];
};

export type EditableUserParams = Pick<
  User,
  "image" | "name" | "slug" | "description"
>;
