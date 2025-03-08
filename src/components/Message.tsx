import { Avatar, Box, Flex, Stack, Text, Title } from "@mantine/core";
import dayjs from "dayjs";

import Markdown from "./Markdown";
import styles from "./Message.module.css";

import type { Message as MessageModel, User } from "@prisma/client";

export type MessageProps = {
  message: Pick<MessageModel, "id" | "createdAt" | "content">;
  user: Pick<User, "id" | "name" | "image">;
};

const Message: React.FC<MessageProps> = (props) => {
  return (
    <Flex className={styles.message} gap="sm">
      <Avatar src={props.user.image} alt={props.user.name} radius="xl" />
      <Stack gap={0}>
        <Flex align="center" gap="xs">
          <Title order={4} size="sm">
            {props.user.name}
          </Title>
          <Text size="xs" c="dimmed">
            {dayjs
              .utc(props.message.createdAt)
              .tz("Asia/Tokyo")
              .format("HH:mm")}
          </Text>
        </Flex>
        <Box>
          <Markdown content={props.message.content} />
        </Box>
        <Flex></Flex>
      </Stack>
    </Flex>
  );
};

export default Message;
