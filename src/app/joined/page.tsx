import { Suspense } from "react";

import { Container, Group, Loader, Space } from "@mantine/core";

import JoinedSteps from "./_components/JoinedSteps";
import StepsIndicator from "./_components/StepsIndicator";

const JoinedPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const progress = parseInt((await searchParams).p as string) || 0;

  return (
    <>
      <Space h="3rem" />
      <StepsIndicator
        active={progress}
        contents={{
          steps: [
            {
              title: "ようこそ",
            },
            {
              title: "プロフィールを設定",
            },
            {
              title: "ワークスペースに参加",
            },
          ],
          completed: "準備完了！",
        }}
      />
      <Container size="sm">
        <Suspense
          fallback={
            <Group justify="center">
              <Loader />
            </Group>
          }
        >
          <JoinedSteps step={progress} />
        </Suspense>
      </Container>
    </>
  );
};

export default JoinedPage;
