"use client";

import React, { useState, useRef, useCallback } from "react";

import { Burger, Group, AppShell as MantineAppShell, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import styles from "./AppShell.module.css";
import Sidebar from "./Sidebar";

type AppShellProps = {
  children: React.ReactNode;
  aside?: React.ReactNode;
};

const AppShell: React.FC<AppShellProps> = ({ children, aside }) => {
  const [opened, { toggle }] = useDisclosure();
  const [sidebarWidth, setSidebarWidth] = useState(300);
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return;
    
    const newWidth = Math.max(200, Math.min(500, e.clientX));
    setSidebarWidth(newWidth);
  }, [isResizing]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return (
    <MantineAppShell
      layout="alt"
      header={{ height: "3rem" }}
      navbar={{ width: sidebarWidth, breakpoint: "sm", collapsed: { mobile: !opened } }}
      aside={{
        width: 300,
        breakpoint: "md",
        collapsed: { desktop: !aside, mobile: true },
      }}
      padding="md"
    >
      <MantineAppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          digichat
        </Group>
      </MantineAppShell.Header>
      <MantineAppShell.Navbar p="md" style={{ position: 'relative' }}>
        <Sidebar />
        <Box
          ref={resizeRef}
          className={styles.resizeHandle}
          onMouseDown={handleMouseDown}
        />
      </MantineAppShell.Navbar>
      <MantineAppShell.Main className={styles.AppShellMain}>
        {children}
      </MantineAppShell.Main>
      {aside && (
        <MantineAppShell.Aside p="md">
          {aside}
        </MantineAppShell.Aside>
      )}
    </MantineAppShell>
  );
};

export default AppShell;
