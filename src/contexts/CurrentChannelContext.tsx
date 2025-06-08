"use client";

import { Channel } from "@prisma/client";
import { createContext, SetStateAction, useState } from "react";

export type CurrentChannelContextType = {
  currentChannel: Channel | null;
  setCurrentChannel: React.Dispatch<SetStateAction<Channel | null>>;
};

export const CurrentChannelContext =
  createContext<CurrentChannelContextType | null>(null);

export function CurrentChannelProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);

  return (
    <CurrentChannelContext.Provider
      value={{
        currentChannel,
        setCurrentChannel,
      }}
    >
      {children}
    </CurrentChannelContext.Provider>
  );
}
