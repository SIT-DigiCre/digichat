import { Stack } from "@mantine/core";

import styles from "./ChannelIDPage.module.css";
import ChannelFooter from "./_components/ChannelFooter/ChannelFooter";
import ChannelHeader from "./_components/ChannelHeader/ChannelHeader";

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
      links: true,
      assets: true,
    },
  });
  const channel = await prisma.channel.findFirst({
    where: {
      id: channel_id,
    },
  });

  return (
    <Stack className={styles["root"]} justify="space-between">
      <ChannelHeader channelName={channel?.name || ""} />
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          user={message.user}
          links={message.links}
          assets={message.assets}
        />
      ))}
      <ChannelFooter user_id="test" is_joined={false} />
    </Stack>
  );
}

export default ChannelIDPage;
