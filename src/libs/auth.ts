import { Account } from "@prisma/client";
import NextAuth, {
  Account as NextAuthAccount,
  NextAuthConfig,
  User,
} from "next-auth";
import Google from "next-auth/providers/google";

import { prismaAdapter } from "./prisma-adapter";

import { createAccount } from "#/repositories/account";
import { getUserByEmailWithAccounts } from "#/repositories/user";

export const authConfig = {
  providers: [Google],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      if (session.user.image && token.picture) {
        session.user.image = token.picture;
      }
      return session;
    },
    async jwt({ token, trigger, session }) {
      if (trigger === "update" && session?.image) {
        token.picture = session.image;
      }
      return token;
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
  adapter: prismaAdapter,
  ...authConfig,
});

const isAccountLinkedToUser = (
  user: User & { accounts: Account[] },
  account: NextAuthAccount
) =>
  user.accounts.some((a) => a.providerAccountId === account.providerAccountId);
