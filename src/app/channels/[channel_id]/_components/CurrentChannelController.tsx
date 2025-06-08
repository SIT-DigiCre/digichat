"use client";

import { useCurrentChannel } from "#/hooks/useCurrentChannel";
import { useDocumentTitle } from "@mantine/hooks";
import { Channel } from "@prisma/client";
import { useEffect } from "react";

export default function CurrentChannelController({
  channel,
}: {
  channel: Channel | null;
}) {
  const { setCurrentChannel } = useCurrentChannel();

  useDocumentTitle(channel ? `${channel.slug} | Digichat` : "Digichat");

  /**
   * チャンネルのページを開いている間、コンテキストにチャンネルの情報を保存する
   */
  useEffect(() => {
    setCurrentChannel(channel);

    return () => {
      setCurrentChannel(null);
    };
  }, [channel]);

  return null;
}
