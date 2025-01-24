import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "./prisma";

const prismaAdapter = PrismaAdapter(prisma);

export { prismaAdapter };
