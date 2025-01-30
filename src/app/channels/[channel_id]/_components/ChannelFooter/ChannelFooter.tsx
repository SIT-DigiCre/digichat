"use client";

import { Box, Button, Flex } from "@mantine/core";

import TextEditor from "../TextEditor/TextEditor";

import styles from "./ChannelFooter.module.css";

type ChannelFooterProps = {
  user_id: string;
  is_joined: boolean;
};

const ChannelFooter: React.FC<ChannelFooterProps> = ({
  user_id,
  is_joined,
}) => {
  return (
    <Box className={styles["channel-footer"]}>
      {is_joined ? (
        <TextEditor
          value="aaa"
          onChange={() => {
            return 0;
          }}
          onSend={() => {
            return 0;
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
          <Button variant="white">参加する</Button>
        </Flex>
      )}
    </Box>
  );
};

export default ChannelFooter;
