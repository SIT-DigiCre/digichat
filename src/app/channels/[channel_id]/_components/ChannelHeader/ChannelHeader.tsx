"use client";

import { useLocalStorage } from "@mantine/hooks";
import { usePathname } from "next/navigation";

type ChannelHeaderProps = {
  channelName: string;
};

/**
 * AppShell の header の title を channelName に書き換える
 *
 * @see {@link src/app/_components/AppShell.tsx}
 */
const ChannelHeader: React.FC<ChannelHeaderProps> = ({ channelName }) => {
  useLocalStorage({
    key: usePathname(),
    defaultValue: channelName,
  });

  // channelName に書き換える処理だけを実行したいので，空の JSX を返す
  return <></>;
};

export default ChannelHeader;
