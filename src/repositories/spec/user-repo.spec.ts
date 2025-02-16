import { UsersRepository } from "../user-repo";

describe("UsersRepository", () => {
  const prisma = jestPrisma.client;

  test("getUserById が存在するユーザーを返す", async () => {
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
    // テスト用ユーザーを作成
    const createdUser = await prisma.user.create({
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

    const repo = new UsersRepository(prisma);
    const user = await repo.getUserById(createdUser.id);

    expect(user).toBeTruthy();
    expect(user?.id).toBe(createdUser.id);
    expect(user?.email).toBe("admin@exmaple.com");
  });

  test("getUserById が存在しないユーザーの場合 null を返す", async () => {
    const repo = new UsersRepository(prisma);
    const result = await repo.getUserById(
      "00000000-0000-0000-0000-000000000000"
    );
    expect(result).toBeNull();
  });
});
