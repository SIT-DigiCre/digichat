import { UserStatus } from "@prisma/client";
import "next-auth";
import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    slug: string;
    status: UserStatus;
    roleId: string;
    verifiedAt: Date | null;
  }

  interface Session extends DefaultSession {
    user: {
      verified: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    verified: boolean;
  }
}
