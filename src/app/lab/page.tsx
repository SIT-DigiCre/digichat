import { List, ListItem, Stack, Title } from "@mantine/core";
import { User } from "@prisma/client";

import LinkCard from "#/components/LinkCard";
import { getCurrentUser } from "#/libs/user";

async function LabPage() {
  const user = await getCurrentUser();

  return (
    <div>
      <Title order={2}>ログイン中ユーザー情報のプレビュー</Title>
      <List withPadding>
        {user ? (
          Object.keys(user).map((k) => (
            <ListItem key={k}>{`${k}: ${user[k as keyof User]}`}</ListItem>
          ))
        ) : (
          <ListItem key={"hoge"}>null (未ログイン)</ListItem>
        )}
      </List>
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
