"use server";

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
