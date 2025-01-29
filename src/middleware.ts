import NextAuth from "next-auth";

import { authConfig } from "./libs/auth";

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: ["/", "/joined", "/channels/:path*"],
};
