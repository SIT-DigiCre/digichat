"use client";

import { useEffect } from "react";

import { Channel } from "@prisma/client";

import { useCurrentChannel } from "#/hooks/useCurrentChannel";

export default function CurrentChannelController({
  channel,
}: {
  channel: Channel | null;
}) {
  const { setCurrentChannel } = useCurrentChannel();

  /**
   * チャンネルのページを開いている間、コンテキストにチャンネルの情報を保存する
   */
  useEffect(() => {
    setCurrentChannel(channel);

    return () => {
      setCurrentChannel(null);
    };
  }, [channel, setCurrentChannel]);

  return null;
}
