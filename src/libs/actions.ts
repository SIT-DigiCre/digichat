"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "./prisma";

type SearchChannelsProps = {
  keyword: string;
};

/**
 * @description キーワードがslugに含まれるチャンネルを検索します。キーワードが指定されていない場合は全てのチャンネルを返します。
 * @param [props.keyword] チャンネル名に含まれるキーワード
 * @returns チャンネルのリスト
 */
export async function searchChannels(props?: SearchChannelsProps) {
  const args = props
    ? { where: { name: { contains: props.keyword } } }
    : undefined;
  const channels = await prisma.channel.findMany(args);

  return channels;
}

/**
 * @description チャンネルに参加します。
 * @param channelId チャンネルID
 * @param userId ユーザーID
 * @returns チャンネル
 */
export async function joinChannel(channelId: string, userId: string) {
  const channel = await prisma.channel.findUnique({
    where: { id: channelId },
  });

  if (!channel) {
    throw new Error("Channel not found");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await prisma.channelMember.create({
    data: {
      channelId: channel.id,
      userId: user.id,
      role: "MEMBER",
    },
  });

  revalidatePath(`/channels/${channel.id}`);
}
