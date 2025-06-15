"use client";

import { Group } from "@mantine/core";

import styles from "./ChannelHeader.module.css";

import { useCurrentChannel } from "#/hooks/useCurrentChannel";

const ChannelHeader: React.FC = () => {
  const { currentChannel } = useCurrentChannel();

  return (
    <Group className={styles["root"]} visibleFrom="sm">
      {currentChannel && currentChannel.slug}
    </Group>
  );
};

export default ChannelHeader;
