"use client";

import { useLayoutEffect, useRef } from "react";

import { Box } from "@mantine/core";

import ChannelFooter from "../ChannelFooter/ChannelFooter";

import styles from "./Channel.module.css";

import type {
  Asset,
  MessageLink,
  Message as MessageModel,
  User,
} from "@prisma/client";

import Message from "#/components/Message";

type ChannelProps = {
  channel_id: string;
  user_id: string;
  messages: (MessageModel & {
    user: User;
    links: MessageLink[];
    assets: Asset[];
  })[];
};

const Channel: React.FC<ChannelProps> = ({ channel_id, messages, user_id }) => {
  // TODO: onloadの自動スクロールがうまくいかないため無限スクロールを実装するタイミングで検証します
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const is_joined = messages.some((message) => message.user.id === user_id);

  useLayoutEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);

  return (
    <Box className={styles["root"]}>
      <Box className={styles["message-area"]}>
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            user={message.user}
            links={message.links}
            assets={message.assets}
          />
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <ChannelFooter
        user_id={user_id}
        channel_id={channel_id}
        is_joined={is_joined}
      />
    </Box>
  );
};

export default Channel;
