import Link from "next/link";

import { ActionIcon, AppShellNavbar, Flex, Menu, Title } from "@mantine/core";
import { IconPlus, IconUser, IconWorld } from "@tabler/icons-react";

import Accordion from "./Accordion";

const Sidebar: React.FC = () => {
  return (
    <>
      <AppShellNavbar bg="blue" c="blue.1" h="full">
        <Flex align="center" justify="space-between" w="full" m="sm">
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
              <Menu.Item
                leftSection={<IconWorld />}
                component={Link}
                href="/view-channels"
              >
                チャンネルを閲覧する
              </Menu.Item>
              <Menu.Item leftSection={<IconUser />}>
                ダイレクトメッセージを開く
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
        <Accordion />
      </AppShellNavbar>
    </>
  );
};

export default Sidebar;
