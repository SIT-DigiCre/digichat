import { Prisma, PrismaPromise, User } from "@prisma/client";

import { prisma } from "#/libs/prisma";
import { UserWithAccounts } from "#/types/prisma";

/**
 * 指定したIDを持つユーザーを取得
 * @param id ID
 * @returns 取得結果 (見つからなければ `null`)
 */
export const getUserById = (id: string): PrismaPromise<User | null> => {
  return prisma.user.findUnique(
    Prisma.validator<Prisma.UserFindUniqueArgs>()({
      where: {
        id,
      },
    })
  );
};

/**
 * 指定したメールアドレスを持つユーザーを取得
 * @param email メールアドレス
 * @returns 取得結果 (見つからなければ `null`)
 */
export const getUserByEmail = (email: string): PrismaPromise<User | null> => {
  return prisma.user.findUnique(
    Prisma.validator<Prisma.UserFindUniqueArgs>()({
      where: {
        email,
      },
    })
  );
};

/**
 * 指定したメールアドレスを持つユーザーと
 * そのユーザーに紐付くアカウントを取得
 * @param email メールアドレス
 * @returns 取得結果 (見つからなければ `null`)
 */
export const getUserByEmailWithAccounts = (
  email: string
): PrismaPromise<UserWithAccounts | null> => {
  return prisma.user.findUnique(
    Prisma.validator<Prisma.UserFindUniqueArgs>()({
      where: {
        email,
      },
      include: {
        accounts: true,
      },
    })
  );
};

/**
 * 指定したslugを持つユーザーを取得
 * @param slug
 * @returns 取得結果 (見つからなければ `null`)
 */
export const getUserBySlug = (slug: string): PrismaPromise<User | null> => {
  return prisma.user.findUnique(
    Prisma.validator<Prisma.UserFindUniqueArgs>()({
      where: {
        slug,
      },
    })
  );
};

/**
 * 新規ユーザーを作成する
 * @param email メールアドレス
 * @param name 表示名
 * @param slug スラッグ
 * @param roleId ロールID
 * @returns 作成したユーザー
 */
export const createUser = (
  email: string,
  name: string,
  slug: string,
  roleId: string
): PrismaPromise<User> => {
  return prisma.user.create(
    Prisma.validator<Prisma.UserCreateArgs>()({
      data: {
        email,
        name,
        slug,
        roleId,
        status: "OFFLINE",
      },
    })
  );
};

/**
 * 指定したユーザーを本登録済みにする
 * @param id
 * @returns ユーザー
 */
export const verifyUser = (id: string): PrismaPromise<User> => {
  return prisma.user.update(
    Prisma.validator<Prisma.UserUpdateArgs>()({
      where: {
        id,
      },
      data: {
        verifiedAt: new Date(),
      },
    })
  );
};

/**
 * ユーザーのプロフィール項目に限定し更新する
 * @param id 更新対象ユーザーのID
 * @param name 表示名
 * @param slug スラッグ
 * @param image アバター画像のURL
 * @param description 自己紹介
 * @returns 更新後のユーザー
 */
export const updateUserProfile = (
  id: string,
  name: string,
  slug: string,
  image: string | null,
  description: string | null
): PrismaPromise<User> => {
  return prisma.user.update(
    Prisma.validator<Prisma.UserUpdateArgs>()({
      where: {
        id,
      },
      data: {
        name,
        slug,
        image,
        description,
      },
    })
  );
};
