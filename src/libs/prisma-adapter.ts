import type { Prisma, PrismaClient } from "@prisma/client";
import type {
  Adapter,
  AdapterAccount,
  AdapterSession,
  AdapterUser,
} from "next-auth/adapters";

/**
 * `@auth/prisma-adapter` と `next-auth` 間で型の不整合が起きていたので再実装
 * @param prisma
 * @returns `PrismaAdapter`
 */
export function PrismaAdapter(
  prisma: PrismaClient | ReturnType<PrismaClient["$extends"]>
): Adapter {
  const p = prisma as PrismaClient;
  return {
    // We need to let Prisma generate the ID because our default UUID is incompatible with MongoDB
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createUser: ({ id, ...data }) =>
      p.user.create(stripUndefined({ ...data, name: data.name! })),
    getUser: (id) => p.user.findUnique({ where: { id } }),
    getUserByEmail: (email) => p.user.findUnique({ where: { email } }),
    async getUserByAccount(provider_providerAccountId) {
      const account = await p.account.findUnique({
        where: { provider_providerAccountId },
        select: { user: true },
      });
      return (account?.user as AdapterUser) ?? null;
    },
    updateUser: ({ id, ...data }) =>
      p.user.update({
        where: { id },
        ...stripUndefined({ ...data, name: data.name! }),
      }) as Promise<AdapterUser>,
    deleteUser: (id) =>
      p.user.delete({ where: { id } }) as Promise<AdapterUser>,
    linkAccount: (data) =>
      p.account.create({ data }) as unknown as AdapterAccount,
    unlinkAccount: (provider_providerAccountId) =>
      p.account.delete({
        where: { provider_providerAccountId },
      }) as unknown as AdapterAccount,
    async getSessionAndUser(sessionToken) {
      const userAndSession = await p.session.findUnique({
        where: { sessionToken },
        include: { user: true },
      });
      if (!userAndSession) return null;
      const { user, ...session } = userAndSession;
      return { user, session } as {
        user: AdapterUser;
        session: AdapterSession;
      };
    },
    createSession: (data) => p.session.create(stripUndefined(data)),
    updateSession: (data) =>
      p.session.update({
        where: { sessionToken: data.sessionToken },
        ...stripUndefined(data),
      }),
    deleteSession: (sessionToken) =>
      p.session.delete({ where: { sessionToken } }),
    async createVerificationToken(data) {
      const verificationToken = await p.verificationToken.create(
        stripUndefined(data)
      );
      // @ts-expect-errors // MongoDB needs an ID, but we don't
      if (verificationToken.id) delete verificationToken.id;
      return verificationToken;
    },
    async useVerificationToken(identifier_token) {
      try {
        const verificationToken = await p.verificationToken.delete({
          where: { identifier_token },
        });
        // @ts-expect-errors // MongoDB needs an ID, but we don't
        if (verificationToken.id) delete verificationToken.id;
        return verificationToken;
      } catch (error) {
        // If token already used/deleted, just return null
        // https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
        if ((error as Prisma.PrismaClientKnownRequestError).code === "P2025")
          return null;
        throw error;
      }
    },

    // NOTE: WebAuthnを導入する場合は以下のコメントアウトを解除する
    /*
      async getAccount(providerAccountId, provider) {
        return p.account.findFirst({
          where: { providerAccountId, provider },
        }) as Promise<AdapterAccount | null>;
      },
      async createAuthenticator(data) {
        return p.authenticator.create(stripUndefined(data));
      },
      async getAuthenticator(credentialID) {
        return p.authenticator.findUnique({
          where: { credentialID },
        });
      },
      async listAuthenticatorsByUserId(userId) {
        return p.authenticator.findMany({
          where: { userId },
        });
      },
      async updateAuthenticatorCounter(credentialID, counter) {
        return p.authenticator.update({
          where: { credentialID },
          data: { counter },
        });
      },
    */
  };
}

/** @see https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/null-and-undefined */
function stripUndefined<T>(obj: T) {
  const data = {} as T;
  for (const key in obj) if (obj[key] !== undefined) data[key] = obj[key];
  return { data };
}
