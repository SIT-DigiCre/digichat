"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useTransition,
} from "react";

import { useSession } from "next-auth/react";

import { AccordionItemProps } from "./AccordionItem";

import { getChannelAccordionItems } from "#/libs/actions";

type ChannelsAccordionContextType = {
  refreshChannelList: () => void;
  accordionItems: AccordionItemProps[];
  isPending: boolean;
};

type ChannelsAccordionProviderProps = {
  children?: React.ReactNode;
};

/**
 * 参加中チャンネルのリストおよび、それを更新するためのメソッドを共有するためのコンテキスト
 */
export const ChannelsAccordionContext = createContext<
  ChannelsAccordionContextType | undefined
>(undefined);

/**
 * 参加中チャンネルのリストおよび、それを更新するためのメソッドをコンテキストから取得する
 * @throws ChannelsAccordionProvider の外で使用された場合 Error を throw
 * @returns コンテキストオブジェクト
 */
export const useChannelsAccordion = () => {
  const channelsAccordionContext = useContext(ChannelsAccordionContext);

  if (!channelsAccordionContext) {
    throw new Error(
      "useChannelsAccordion must be used within an ChannelsAccordionProvider"
    );
  }

  return channelsAccordionContext;
};

/**
 * ChannelsAccordionContextのプロバイダ \
 * session を利用するため、 SessionProvider の子要素として配置する必要がある
 */
const ChannelsAccordionProvider = ({
  children,
}: ChannelsAccordionProviderProps) => {
  const [isPending, startTransition] = useTransition();
  const [accordionItems, setAccordionItems] = useState<AccordionItemProps[]>(
    []
  );
  const { data: session } = useSession();

  /**
   * 参加中チャンネルのリストを更新する
   */
  const refreshChannelList = useCallback(
    () =>
      startTransition(async () => {
        if (!session || !session.user.id) return;

        try {
          const result = await getChannelAccordionItems(session.user.id);
          if (!result) throw new Error("チャンネル一覧の取得に失敗しました");
          startTransition(() => {
            setAccordionItems(result);
          });
        } catch {
          startTransition(() => {
            setAccordionItems([]);
          });
        }
      }),
    [session]
  );

  return (
    <ChannelsAccordionContext.Provider
      value={{
        accordionItems,
        refreshChannelList,
        isPending,
      }}
    >
      {children}
    </ChannelsAccordionContext.Provider>
  );
};

export default ChannelsAccordionProvider;
