"use client";

import { useCurrentChannel } from "#/hooks/useCurrentChannel";
import { Text } from "@mantine/core";

/**
 * 余計な再描画を防ぐため、チャンネル名を参照する部分を AppShell から分離
 */
export default function () {
  const { currentChannel } = useCurrentChannel();

  return <Text hiddenFrom="sm">{currentChannel && currentChannel.slug}</Text>;
}
