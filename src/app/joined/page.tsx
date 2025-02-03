import { Container } from "@mantine/core";

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
        <JoinedSteps step={progress} />
      </Container>
    </>
  );
};

export default JoinedPage;
