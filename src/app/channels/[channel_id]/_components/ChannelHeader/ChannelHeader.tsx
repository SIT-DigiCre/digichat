"use client";

import { Group } from "@mantine/core";

import styles from "./ChannelHeader.module.css";

type ChannelHeaderProps = {
  channelName: string;
};

const ChannelHeader: React.FC<ChannelHeaderProps> = ({ channelName }) => {
  return (
    <Group className={styles["root"]} visibleFrom="sm">
      {channelName}
    </Group>
  );
};

export default ChannelHeader;
