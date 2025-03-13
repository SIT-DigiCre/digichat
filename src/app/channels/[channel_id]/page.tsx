import { auth } from "#/libs/auth";
import { prisma } from "#/libs/prisma";
import Channel from "./_components/Channel/Channel";

type ChannelIDPageProps = {
  params: Promise<{ channel_id: string }>;
};

async function ChannelIDPage({ params }: ChannelIDPageProps) {
  const session = await auth();
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

  const is_joined = channel.members.some(
    (member) => member.userId === session?.user.id
  );

  return (
    <Channel
      session={session}
      channel_id={channel_id}
      messages={messages}
      is_joined={is_joined}
    />
  );
}

export default ChannelIDPage;
