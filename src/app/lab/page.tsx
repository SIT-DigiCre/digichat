import { Stack, Title } from "@mantine/core";
import { PrismaClient } from "@prisma/client";

import LinkCard from "#/components/LinkCard";
import Message from "#/components/Message";

export async function LabPage() {
  console.log(process.env.POSTGRES_URL);
  const client = new PrismaClient();
  const messages = await client.message.findMany({
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
      <Message
        message={{
          channel_id: "1",
          id: "1",
          created_at: new Date(),
          content: "Hello, World!",
        }}
        user={{
          id: "1",
          name: "John Doe",
          icon_url: "https://example.com/avatar.jpg",
        }}
      />
      <Title order={2}>コンポーネントのプレビュー用</Title>
      <Stack gap="md">
        <LinkCard href="https://github.com/SIT-DigiCre/digichat" />
        <LinkCard href="https://x.com/sitdigicre" />
        <LinkCard href="https://x.com/sitdigicre/status/1874380689183052086" />
        <LinkCard href="a" />
      </Stack>
    </div>
  );
}

export default LabPage;
