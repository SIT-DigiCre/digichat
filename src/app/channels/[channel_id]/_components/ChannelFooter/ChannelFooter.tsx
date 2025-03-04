"use client";

import React, { useState, useTransition } from "react";

import { Box, Button, Flex } from "@mantine/core";

import TextEditor from "../TextEditor/TextEditor";

import styles from "./ChannelFooter.module.css";

import { joinChannel } from "#/libs/actions";

type ChannelFooterProps = {
  channel_id: string;
  user_id: string;
  is_joined: boolean;
};

const ChannelFooter: React.FC<ChannelFooterProps> = ({
  channel_id,
  user_id,
  is_joined,
}) => {
  const [value, setValue] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    startTransition(async () => {
      await joinChannel(channel_id, user_id);
    });
  };

  return (
    <Box className={styles["channel-footer"]}>
      {is_joined ? (
        <TextEditor
          channel_id={channel_id}
          value={value}
          onChange={setValue}
          onSend={() => {
            setValue("");
          }}
          user_id={user_id}
        />
      ) : (
        <Flex
          align="center"
          justify="space-between"
          className={styles["join-channel-confirm"]}
        >
          <Box>チャンネルに参加していません</Box>
          <Button variant="white" onClick={handleClick} disabled={isPending}>
            参加する
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default ChannelFooter;
