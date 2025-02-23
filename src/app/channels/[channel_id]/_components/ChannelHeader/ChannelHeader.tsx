"use client";

import { AppShellHeader } from "@mantine/core";

type ChannelHeaderProps = {
  channelName: string;
};

const ChannelHeader: React.FC<ChannelHeaderProps> = ({ channelName }) => {
  return <AppShellHeader>{channelName}</AppShellHeader>;
};

export default ChannelHeader;
