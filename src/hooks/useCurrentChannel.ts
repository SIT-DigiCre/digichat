"use client";

import { useContext } from "react";

import { CurrentChannelContext } from "#/contexts/CurrentChannelContext";

/**
 * 現在開いているチャンネルの情報を利用する
 * @returns getter 及び setter
 */
export function useCurrentChannel() {
  const context = useContext(CurrentChannelContext);

  if (!context)
    throw new Error(
      "useCurrentChannel は <CurrentChannelProvider> 内で使用される必要があります"
    );

  return context;
}
