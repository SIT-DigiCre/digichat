import { Avatar, Box, Flex, Stack, Text, Title } from "@mantine/core";

import styles from "./Message.module.css";

export type MessageProps = {
  channel_id: string;
  message_id: string;
  created_at: string;
  user: {
    id: string;
    name: string;
    avatar_url: string;
  };
  content: string;
};

const Message: React.FC<MessageProps> = (props) => {
  return (
    <Flex className={styles.message} gap="sm">
      <Avatar src={props.user.avatar_url} alt={props.user.name} radius="xl" />
      <Stack gap="xs">
        <Flex align="center" gap="sm">
          <Title order={4}>{props.user.name}</Title>
          <Text size="xs" color="dimmed">
            {props.created_at}
          </Text>
        </Flex>
        <Box>{props.content}</Box>
        <Flex></Flex>
      </Stack>
    </Flex>
  );
};

export default Message;
