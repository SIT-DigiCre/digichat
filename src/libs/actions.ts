"use server";

import { prisma } from "./prisma";

type SearchChannelsProps = {
  keyword?: string;
};

/**
 * @description キーワードがslugに含まれるチャンネルを検索します。キーワードが指定されていない場合は全てのチャンネルを返します。
 * @param [props.keyword] チャンネル名に含まれるキーワード
 * @returns チャンネルのリスト
 */
export async function searchChannels({ keyword }: SearchChannelsProps) {
  const args = keyword ? { where: { name: { contains: keyword } } } : undefined;
  const channels = await prisma.channel.findMany(args);

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return channels;
}
