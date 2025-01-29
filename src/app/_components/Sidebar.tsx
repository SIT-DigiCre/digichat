import { ActionIcon, AppShellNavbar, Flex, Menu, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus, IconUser, IconWorld } from "@tabler/icons-react";

import Accordion from "./Accordion";

import ViewChannelsModal from "#/components/ViewChannelsModal/ViewChannelsModal";

const Sidebar: React.FC = () => {
  const [opened, { open, close }] = useDisclosure();

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
              <Menu.Item leftSection={<IconWorld />} onClick={open}>
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
      <ViewChannelsModal opened={opened} close={close} />
    </>
  );
};

export default Sidebar;
