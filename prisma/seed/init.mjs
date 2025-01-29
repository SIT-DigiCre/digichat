
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const workspace = await prisma.workspace.create({
    data: {
      name: "Test",
      description: "A workspace for development",
    },
  });
  const adminRole = await prisma.userRole.create({
    data: {
      name: "admin",
      permissions: {
        create: true,
        read: true,
        update: true,
        delete: true,
      },
    },
  });
  const user = await prisma.user.create({
    data: {
      name: "テスト管理者",
      slug: "admin",
      email: "admin@exmaple.com",
      password: "password",
      iconUrl: "https://with.koeni.dev/identicon/admin",
      status: "ONLINE",
      roleId: adminRole.id,
    },
  });
  const channel = await prisma.channel.create({
    data: {
      slug: "general",
      name: "general",
      workspaceId: workspace.id,
      type: "PUBLIC",
    },
  });
  await prisma.message.create({
    data: {
      content: "Hello, World!",
      channelId: channel.id,
      userId: user.id,
      type: "NORMAL",
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
