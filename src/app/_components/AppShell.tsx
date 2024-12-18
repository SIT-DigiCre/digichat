"use client";

import React from "react";

import TextEditor from "#/components/TextEditor";
import {
  Burger,
  Group,
  AppShell as MantineAppShell,
  Skeleton,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

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
      <MantineAppShell.Navbar p="md">
        <Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Text>Navbar</Text>
        </Group>
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </MantineAppShell.Navbar>
      <MantineAppShell.Main>{children}</MantineAppShell.Main>
      <MantineAppShell.Aside p="md">Aside</MantineAppShell.Aside>
      <MantineAppShell.Footer p="md">
        <TextEditor />
      </MantineAppShell.Footer>
    </MantineAppShell>
  );
};

export default AppShell;
