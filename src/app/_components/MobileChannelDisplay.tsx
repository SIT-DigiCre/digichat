"use client";

import { Text } from "@mantine/core";

import { useCurrentChannel } from "#/hooks/useCurrentChannel";

/**
 * 余計な再描画を防ぐため、チャンネル名を参照する部分を AppShell から分離
 */
export default function MobileChannelDisplay() {
  const { currentChannel } = useCurrentChannel();

  return <Text hiddenFrom="sm">{currentChannel && currentChannel.slug}</Text>;
}
