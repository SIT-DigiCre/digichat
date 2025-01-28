import { Stack, Title } from "@mantine/core";

import LinkCard from "#/components/LinkCard";
import Message from "#/components/Message";

const LabPage = () => {
  return (
    <div>
      <Message
        message={{
          channel_id: "1",
          message_id: "1",
          created_at: "2021-10-01T00:00:00Z",
          content: "Hello, World!",
        }}
        user={{
          id: "1",
          name: "John Doe",
          avatar_url: "https://example.com/avatar.jpg",
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
};

export default LabPage;
