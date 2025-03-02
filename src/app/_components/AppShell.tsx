"use client";

import { usePathname } from "next/navigation";
import React from "react";

import { Box, Burger, Group, AppShell as MantineAppShell } from "@mantine/core";
import {
  readLocalStorageValue,
  useDisclosure,
  useDocumentTitle,
} from "@mantine/hooks";

import styles from "./AppShell.module.css";
import Sidebar from "./Sidebar";

type AppShellProps = {
  children: React.ReactNode;
};

const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();

  const defaultTitle = "Digichat";

  /**
   * channelName を取得し，タイトルに表示する
   *
   * @see {@link src/app/channels/[channel_id]/_components/ChannelHeader/ChannelHeader.tsx}
   */
  const title = readLocalStorageValue({
    key: usePathname(),
    defaultValue: defaultTitle,
  });

  // ページタイトルを更新する
  title !== defaultTitle && useDocumentTitle(`${defaultTitle} > ${title}`);

  return (
    <MantineAppShell
      layout="alt"
      header={{ height: "3rem" }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      aside={{
        width: 300,
        breakpoint: "md",
        collapsed: { desktop: false, mobile: true },
      }}
      padding="md"
    >
      <MantineAppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Box>{title}</Box>
        </Group>
      </MantineAppShell.Header>
      <Sidebar />
      <MantineAppShell.Main className={styles.AppShellMain}>
        {children}
      </MantineAppShell.Main>
      <MantineAppShell.Aside p="md">Aside</MantineAppShell.Aside>
    </MantineAppShell>
  );
};

export default AppShell;
