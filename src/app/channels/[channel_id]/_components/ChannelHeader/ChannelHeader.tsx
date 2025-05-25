"use client";

import { Group } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";

import styles from "./ChannelHeader.module.css";

type ChannelHeaderProps = {
  channelName: string;
};

const ChannelHeader: React.FC<ChannelHeaderProps> = ({ channelName }) => {
  useDocumentTitle(`${channelName} | Digichat`);

  return (
    <Group className={styles["root"]} visibleFrom="sm">
      {channelName}
    </Group>
  );
};

export default ChannelHeader;
