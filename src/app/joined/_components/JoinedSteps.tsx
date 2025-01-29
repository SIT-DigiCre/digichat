import Link from "next/link";

import { Button, Space, Text } from "@mantine/core";

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
    default: {
      return <></>;
    }
  }
};

export default JoinedSteps;
