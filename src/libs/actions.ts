"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "./prisma";

import type { Asset, MessageType } from "@prisma/client";

import { AccordionItemProps } from "#/app/_components/AccordionItem";
import { getCategoriesWithChannelMembersWithChannel } from "#/repositories/channelCategory";
import { getUncategorizedChannelMembersWithChannel } from "#/repositories/channelMember";

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
    ? { where: { slug: { contains: props.keyword } } }
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

  const lastChannelMember = await prisma.channelMember.findFirst({
    where: {
      userId,
      categoryId: null, // Ensure we only fetch members from the default category
    },
    orderBy: {
      displayOrder: "desc",
    },
  });

  // デフォルトカテゴリの最後尾に追加
  await prisma.channelMember.create({
    data: {
      channelId: channel.id,
      userId: user.id,
      role: "MEMBER",
      displayOrder: lastChannelMember ? lastChannelMember.displayOrder + 1 : 0,
    },
  });

  revalidatePath(`/channels/${channel.id}`);
}

type SendMessageProps = {
  channelId: string;
  userId: string;
  type: MessageType;
  content: string;
  assets?: Pick<Asset, "url" | "type">[];
};

/**
 * @description メッセージを送信します。
 * @param props.channelId チャンネルID
 * @param props.userId ユーザーID
 * @param props.type メッセージタイプ
 * @param props.content メッセージ内容
 */
export async function sendMessage(props: SendMessageProps) {
  const { assets, ...messageProps } = props;
  const channel = await prisma.channel.findUnique({
    where: { id: props.channelId },
  });

  if (!channel) {
    throw new Error("Channel not found");
  }

  const user = await prisma.user.findUnique({
    where: { id: props.userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await prisma.message.create({
    data: {
      ...messageProps,
      channelId: channel.id,
      userId: user.id,
      assets: {
        create: assets,
      },
    },
  });

  revalidatePath(`/channels/${channel.id}`);
}

/**
 * ユーザーが参加しているチャンネルのリストを AccordionItemProps[] の形式で取得
 * @param userId
 * @returns ユーザーが参加しているチャンネルのリスト
 */
export async function getChannelAccordionItems(
  userId: string
): Promise<AccordionItemProps[] | null> {
  // 暫定的
  const workspace = await prisma.workspace.findFirst({
    where: {
      users: {
        some: {
          userId,
        },
      },
    },
  });

  if (!workspace) return null;

  // カテゴリとそれに紐づくチャンネルを取得 (カテゴリに紐づけられていないチャンネルも取得)
  const [uncategorizedChannelMembers, categories] = await Promise.all([
    getUncategorizedChannelMembersWithChannel(userId, workspace.id),
    getCategoriesWithChannelMembersWithChannel(userId, workspace.id),
  ]);

  // カテゴリ無しのチャンネルリストとカテゴリ分けされたチャンネルリストを統合
  const mergedItems = [
    {
      name: "チャンネル",
      channelMembers: uncategorizedChannelMembers,
    },
    ...categories.map((category) => {
      return {
        name: category.name,
        channelMembers: category.channelMembers,
      };
    }),
  ] satisfies AccordionItemProps[];

  return mergedItems;
}
