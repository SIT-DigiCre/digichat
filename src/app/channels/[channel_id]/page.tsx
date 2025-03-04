import { Stack } from "@mantine/core";

import styles from "./ChannelIDPage.module.css";
import ChannelFooter from "./_components/ChannelFooter/ChannelFooter";

import Message from "#/components/Message";
import { auth } from "#/libs/auth";
import { prisma } from "#/libs/prisma";

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
    },
  });

  if (!session || !channel) return null;

  const is_joined = channel.members.some(
    (member) => member.userId === session?.user.id
  );

  return (
    <Stack className={styles["root"]} justify="space-between">
      {messages.map((message) => (
        <Message key={message.id} message={message} user={message.user} />
      ))}
      <ChannelFooter
        user_id={session.user.id!}
        channel_id={channel_id}
        is_joined={is_joined}
      />
    </Stack>
  );
}

export default ChannelIDPage;
