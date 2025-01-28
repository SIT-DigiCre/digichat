import { Avatar, Box, Flex, Stack, Text, Title } from "@mantine/core";
import dayjs from "dayjs";

import styles from "./Message.module.css";

export type MessageProps = {
  message: {
    id: string;
    channel_id: string;
    created_at: Date;
    content: string;
  };
  user: {
    id: string;
    name: string;
    icon_url: string | null;
  };
};

const Message: React.FC<MessageProps> = (props) => {
  return (
    <Flex className={styles.message} gap="sm">
      <Avatar src={props.user.icon_url} alt={props.user.name} radius="xl" />
      <Stack gap={0}>
        <Flex align="center" gap="xs">
          <Title order={4} size="sm">
            {props.user.name}
          </Title>
          <Text size="xs" c="dimmed">
            {dayjs(props.message.created_at).format("HH:mm")}
          </Text>
        </Flex>
        <Box>{props.message.content}</Box>
        <Flex></Flex>
      </Stack>
    </Flex>
  );
};

export default Message;
