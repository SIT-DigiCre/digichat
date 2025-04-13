import { PrismaPromise } from "@prisma/client";

import { prisma } from "#/libs/prisma";
import { ChannelMemberWithChannel } from "#/types/prisma";

/**
 * 選択したユーザーの参加チャンネルのうち、チャンネルカテゴリを登録していないチャンネルを取得
 * @param userId
 * @param workspaceId
 * @returns チャンネルのリスト (ChannelMemberWithChannel)
 */
export const getUncategorizedChannelMembersWithChannel = (
  userId: string,
  workspaceId: string
): PrismaPromise<ChannelMemberWithChannel[]> => {
  return prisma.channelMember.findMany({
    where: {
      userId,
      channel: {
        workspaceId,
      },
      categoryId: null,
    },
    include: {
      channel: true,
    },
    orderBy: {
      displayOrder: "asc",
    },
  });
};
