import {
  Prisma,
  PrismaPromise,
  Workspace,
  WorkspaceMember,
} from "@prisma/client";

import { prisma } from "#/libs/prisma";

/**
 * 指定したユーザーが未参加かつ、参加可能なワークスペースを取得
 * @param userId
 * @returns ユーザーが未参加のワークスペースのリスト
 */
export const getJoinableWorkspaces = (
  userId: string
): PrismaPromise<Workspace[]> => {
  return prisma.workspace.findMany({
    where: {
      NOT: {
        users: {
          some: {
            userId,
          },
        },
      },
    },
  });
};

/**
 * 指定したユーザーが参加しているワークスペースを取得
 * @param userId
 * @returns ユーザーが参加しているワークスペースのリスト
 */
export const getJoinedWorkspaces = (
  userId: string
): PrismaPromise<Workspace[]> => {
  return prisma.workspace.findMany({
    where: {
      users: {
        some: {
          userId,
        },
      },
    },
  });
};

/**
 * ユーザーをワークスペースに追加
 * @param userId ユーザーのID
 * @param workspaceId ワークスペースのID
 * @param role ワークスペース上のロール
 * @returns ユーザー・ワークスペース間の中間オブジェクト
 */
export const addUserToWorkspace = (
  userId: string,
  workspaceId: string,
  role: string
): PrismaPromise<WorkspaceMember> => {
  return prisma.workspaceMember.create(
    Prisma.validator<Prisma.WorkspaceMemberCreateArgs>()({
      data: {
        userId,
        workspaceId,
        role,
      },
    })
  );
};
