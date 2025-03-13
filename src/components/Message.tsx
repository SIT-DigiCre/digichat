import {
  Avatar,
  Box,
  Container,
  Flex,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import dayjs from "dayjs";

import LinkCard from "./LinkCard";
import Markdown from "./Markdown";
import MediaView from "./MediaView";
import styles from "./Message.module.css";

import type {
  Asset,
  MessageLink,
  Message as MessageModel,
  User,
} from "@prisma/client";

// FIXME: LinkCardがMessageLinkに対応していないため暫定対応としてIDとURLのみ渡す
export type MessageProps = {
  message: Pick<MessageModel, "id" | "createdAt" | "content">;
  user: Pick<User, "id" | "name" | "image">;
  links: Pick<MessageLink, "id" | "url">[];
  assets: Pick<Asset, "id" | "type" | "url">[];
};

const Message: React.FC<MessageProps> = (props) => {
  return (
    <Flex className={styles["message"]} gap="sm">
      <Avatar src={props.user.image} alt={props.user.name} radius="xl" />
      <Stack className={styles["contents-stack"]}>
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
        <Container className={styles["container"]}>
          <Box>
            <Markdown content="<p>hello</p>" />
          </Box>
          {props.assets.length > 0 && (
            <MediaView assets={props.assets} className={styles["media"]} />
          )}
          <Box className={styles["linkcard-container"]}>
            {/* FIXME: LinkCardがMessageLinkに対応していないため暫定対応 */}
            {props.links.map((link) => (
              <LinkCard href={link.url} key={link.id} />
            ))}
          </Box>
        </Container>
      </Stack>
    </Flex>
  );
};

export default Message;
