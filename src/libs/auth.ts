import { Account } from "@prisma/client";
import NextAuth, {
  Account as NextAuthAccount,
  NextAuthConfig,
  User,
} from "next-auth";
import Google from "next-auth/providers/google";

import { prisma } from "./prisma";
import { PrismaAdapter } from "./prisma-adapter";

import { createAccount } from "#/repositories/account";
import { getUserByEmailWithAccounts } from "#/repositories/user";

export const authConfig = {
  providers: [Google],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.verified = !!user.verifiedAt;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        if (token.sub) session.user.id = token.sub;
        session.user.verified = token.verified;
        session.user.image = token.picture;
      }
      return session;
    },
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        // 学番ドメイン以外はログインさせない
        if (
          !profile?.email_verified ||
          !profile.email?.endsWith("@shibaura-it.ac.jp")
        ) {
          return false;
        }

        const user = await getUserByEmailWithAccounts(profile.email);

        // 未登録の場合はログインさせない
        if (!user) return false;

        // 仮登録の場合はUserにアカウントを紐付ける
        if (!isAccountLinkedToUser(user, account)) {
          await createAccount({ ...account, userId: user.id });
        }
      }
      return true;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, unstable_update, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  ...authConfig,
});

const isAccountLinkedToUser = (
  user: User & { accounts: Account[] },
  account: NextAuthAccount
) =>
  user.accounts.some((a) => a.providerAccountId === account.providerAccountId);
