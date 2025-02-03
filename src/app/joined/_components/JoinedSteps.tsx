import Link from "next/link";

import { Button, Space, Text } from "@mantine/core";

import FinishButton from "./FinishButton";

const JoinedSteps = (props: { step: number }) => {
  const { step } = props;

  switch (step) {
    case 0:
      return (
        <>
          <Text>Digichatへようこそ！</Text>
          <Space h="sm" />
          <Text>Digichatで交流するための準備を始めましょう！</Text>
          <Space h="xl" />
          <Button component={Link} href="?p=1">
            次へ
          </Button>
        </>
      );
    case 1:
      return (
        <>
          <Text>仮置き</Text>
          <Space h="xl" />
          <Button component={Link} href={"?p=2"}>
            次へ
          </Button>
        </>
      );
    case 2:
      return (
        <>
          <Text>仮置き</Text>
          <Space h="xl" />
          <Button component={Link} href={"?p=2"}>
            次へ
          </Button>
        </>
      );
    case 3:
      return (
        <>
          <Text>Digichatを利用する準備ができました！(仮)</Text>
          <FinishButton />
        </>
      );
    default: {
      return <></>;
    }
  }
};

export default JoinedSteps;
