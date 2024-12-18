import { ActionIcon, AppShellNavbar, Flex, Menu, Title } from "@mantine/core";
import { IconPlus, IconUser, IconWorld } from "@tabler/icons-react";

const Sidebar: React.FC = () => {
  return (
    <AppShellNavbar bg="blue" c="white" h="full" p="sm">
      <Flex align="center" justify="space-between" w="full">
        <Title order={1} size="1.5rem">
          Digichat
        </Title>
        <Menu shadow="md" position="right-start">
          <Menu.Target>
            <ActionIcon size="lg" variant="subtle" color="white" radius="xl">
              <IconPlus />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item leftSection={<IconPlus />}>
              新しいチャンネルを作成する
            </Menu.Item>
            <Menu.Item leftSection={<IconWorld />}>
              チャンネルを閲覧する
            </Menu.Item>
            <Menu.Item leftSection={<IconUser />}>
              ダイレクトメッセージを開く
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
    </AppShellNavbar>
  );
};

export default Sidebar;
