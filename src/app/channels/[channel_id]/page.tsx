import Message from "#/components/Message";
import { prisma } from "#/libs/prisma";

type ChannelIDPageProps = {
  params: Promise<{ channel_id: string }>;
};

async function ChannelIDPage({ params }: ChannelIDPageProps) {
  const { channel_id } = await params;
  const messages = await prisma.message.findMany({
    where: {
      id: channel_id,
    },
    include: {
      user: true,
    },
  });

  return (
    <div>
      {messages.map((message) => (
        <Message
          key={message.id}
          message={{
            id: message.id,
            channel_id: message.channelId,
            created_at: message.createdAt,
            content: message.content,
          }}
          user={{
            id: message.user.id,
            name: message.user.name,
            icon_url: message.user.iconUrl,
          }}
        />
      ))}
    </div>
  );
}

export default ChannelIDPage;
