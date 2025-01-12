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
  return <div>{props.content}</div>;
};

export default Message;
