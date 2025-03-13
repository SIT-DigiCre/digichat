import styles from "./MessageArea.module.scss";

import type { Message as MessageModel, User } from "@prisma/client";

import Message from "#/components/Message";

type MessageAreaProps = {
  messages: (MessageModel & {
    user: User;
  })[];
};

const MessageArea: React.FC<MessageAreaProps> = ({ messages }) => {
  return (
    <div className={styles["message-area"]}>
      {messages.map((message) => (
        <Message key={message.id} message={message} user={message.user} />
      ))}
    </div>
  );
};

export default MessageArea;
