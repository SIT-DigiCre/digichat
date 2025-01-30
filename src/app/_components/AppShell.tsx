"use client";

import React from "react";

import { Burger, Group, AppShell as MantineAppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import styles from "./AppShell.module.css";
import Sidebar from "./Sidebar";

import TextEditor from "#/app/channels/[channel_id]/_components/TextEditor";

type AppShellProps = {
  children: React.ReactNode;
};

const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <MantineAppShell
      layout="alt"
      header={{ height: 60 }}
      footer={{ height: 60 }}
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
          digichat
        </Group>
      </MantineAppShell.Header>
      <Sidebar />
      <MantineAppShell.Main className={styles.AppShellMain}>
        {children}
      </MantineAppShell.Main>
      <MantineAppShell.Aside p="md">Aside</MantineAppShell.Aside>
      <MantineAppShell.Footer p="xs" h="auto" withBorder={false}>
        <TextEditor
          value="aaa"
          onChange={() => {
            return 0;
          }}
          onSend={() => {
            return 0;
          }}
        />
      </MantineAppShell.Footer>
    </MantineAppShell>
  );
};

export default AppShell;
