import { Stack, Title } from "@mantine/core";

import LinkCard from "#/components/LinkCard";

const LabPage = () => {
  return (
    <div>
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
