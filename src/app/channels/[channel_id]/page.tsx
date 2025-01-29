import Message from "#/components/Message";
import { prisma } from "#/libs/prisma";

type ChannelIDPageProps = {
  params: Promise<{ channel_id: string }>;
};

async function ChannelIDPage({ params }: ChannelIDPageProps) {
  const { channel_id } = await params;
  const messages = await prisma.message.findMany({
    where: {
      channelId: channel_id,
    },
    include: {
      user: true,
    },
  });

  return (
    <div>
      {messages.map((message) => (
        <Message key={message.id} message={message} user={message.user} />
      ))}
    </div>
  );
}

export default ChannelIDPage;
