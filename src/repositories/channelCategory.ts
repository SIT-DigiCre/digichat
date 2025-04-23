import { ChannelCategory, PrismaPromise } from "@prisma/client";

import { prisma } from "#/libs/prisma";
import { ChannelMemberWithChannel } from "#/types/prisma";

/**
 * 指定したユーザーのチャンネルカテゴリおよび、カテゴリに紐づけられた参加チャンネルを取得
 * @param userId
 * @param workspaceId
 * @returns チャンネルカテゴリのリスト (ChannelCategory & {channelMembers: ChannelMemberWithChannel[]})
 */
export const getCategoriesWithChannelMembersWithChannel = (
  userId: string,
  workspaceId: string
): PrismaPromise<
  (ChannelCategory & {
    channelMembers: ChannelMemberWithChannel[];
  })[]
> => {
  return prisma.channelCategory.findMany({
    where: {
      userId,
      workspaceId,
    },
    include: {
      channelMembers: {
        include: {
          channel: true,
        },
        orderBy: {
          displayOrder: "asc",
        },
      },
    },
  });
};
