"use server";

import { prisma } from "./prisma";

type SearchChannelsProps = {
  keyword: string;
};

export async function searchChannels({ keyword }: SearchChannelsProps) {
  const channels = await prisma.channel.findMany({
    where: {
      name: {
        contains: keyword,
      },
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return channels;
}
