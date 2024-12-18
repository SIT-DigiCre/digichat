import {
  Accordion,
  ActionIcon,
  AppShellNavbar,
  Flex,
  Menu,
  Title,
} from "@mantine/core";
import { IconPlus, IconUser, IconWorld } from "@tabler/icons-react";
import AccordionItem, { type AccordionItemProps } from "./AccordionItem";

import styles from "./Sidebar.module.css";

const categories: AccordionItemProps[] = [
  {
    categoryName: "General",
    channels: [
      { title: "announcements", id: "1" },
      { title: "random", id: "2" },
      { title: "welcome", id: "3" },
    ],
  },
];

const Sidebar: React.FC = () => {
  return (
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
            <Menu.Item leftSection={<IconWorld />}>
              チャンネルを閲覧する
            </Menu.Item>
            <Menu.Item leftSection={<IconUser />}>
              ダイレクトメッセージを開く
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
      <Accordion
        chevronPosition="left"
        classNames={{
          label: styles.AccordionLabel,
          content: styles.AccordionContent,
          panel: styles.AccordionPanel,
        }}
      >
        {categories.map((category) => (
          <AccordionItem
            key={category.categoryName}
            channels={category.channels}
            categoryName={category.categoryName}
          />
        ))}
      </Accordion>
    </AppShellNavbar>
  );
};

export default Sidebar;
