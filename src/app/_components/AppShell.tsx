"use client";

import React, { Suspense } from "react";

import LinkCard from "#/components/LinkCard";
import { Burger, Group, AppShell as MantineAppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Sidebar from "./Sidebar";

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
      <MantineAppShell.Main>{children}</MantineAppShell.Main>
      <MantineAppShell.Aside p="md">Aside</MantineAppShell.Aside>
      <MantineAppShell.Footer p="md" h="100%">
        <Suspense fallback={<div>Loading...</div>}>
          <LinkCard href="https://newt239.dev/" />
        </Suspense>
      </MantineAppShell.Footer>
    </MantineAppShell>
  );
};

export default AppShell;
