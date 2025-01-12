import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        return !!(
          profile?.email_verified &&
          profile.email?.endsWith("@shibaura-it.ac.jp")
        );
      }
      return true;
    },
  },
});
