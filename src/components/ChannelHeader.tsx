import { Text, Title } from "@mantine/core";

type Props = {
  channelName: string;
  channelDescription: string;
};

const ChannelHeader = (props: Props) => {
  const { channelName, channelDescription } = props;

  return (
    <div>
      <Title order={1} size="h2">
        {channelName}
      </Title>
      <Text lineClamp={1}>{channelDescription}</Text>
    </div>
  );
};

export default ChannelHeader;
