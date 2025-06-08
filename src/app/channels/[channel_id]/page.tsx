import { redirect } from "next/navigation";

import Channel from "./_components/Channel/Channel";

import { useCurrentChannel } from "#/hooks/useCurrentChannel";
import { auth } from "#/libs/auth";
import { prisma } from "#/libs/prisma";
import CurrentChannelController from "./_components/CurrentChannelController";

type ChannelIDPageProps = {
  params: Promise<{ channel_id: string }>;
};

async function ChannelIDPage({ params }: ChannelIDPageProps) {
  const session = await auth();
  const { setCurrentChannel } = useCurrentChannel();
  const { channel_id } = await params;
  const channel = await prisma.channel.findUnique({
    where: {
      id: channel_id,
    },
    include: {
      members: true,
    },
  });
  const messages = await prisma.message.findMany({
    where: {
      channelId: channel_id,
    },
    include: {
      user: true,
      links: true,
      assets: true,
    },
  });

  if (!session || !channel) return null;

  if (!session.user.id) {
    // 認証されていない場合はログインページにリダイレクト
    redirect("/login");
  }

  const user_id = session.user.id;

  return (
    <>
      <CurrentChannelController channel={channel} />
      <Channel channel_id={channel_id} messages={messages} user_id={user_id} />
    </>
  );
}

export default ChannelIDPage;
