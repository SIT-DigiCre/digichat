import styles from "./Message.module.css";

export type MessageProps = {
  channel_id: string;
  message_id: string;
  user: {
    id: string;
    name: string;
    avatar_url: string;
  };
  content: string;
};

const Message: React.FC<MessageProps> = (props) => {
  return <div className={styles.message}>{props.content}</div>;
};

export default Message;
