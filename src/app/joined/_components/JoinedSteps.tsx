import Link from "next/link";
import { Suspense } from "react";

import { Button, Group, Loader, Text } from "@mantine/core";

import FinishButton from "./FinishButton";
import WorkspaceSelector from "./WorkspaceSelector";

import ProfileEditor from "#/components/ProfileEditor";
import { getCurrentUser } from "#/libs/user";
import { EditableUserParams } from "#/types/prisma";

const JoinedSteps = async (props: { step: number }) => {
  const { step } = props;

  const user = await getCurrentUser();
  if (!user) return <>ユーザーの取得に失敗しました</>;

  switch (step) {
    case 0:
      return (
        <>
          <Text mb="xs">Digichatへようこそ！</Text>
          <Text mb="lg">Digichatで交流するための準備を始めましょう！</Text>
          <Button component={Link} href="?p=1">
            次へ
          </Button>
        </>
      );
    case 1:
      const { name, slug, description, image }: EditableUserParams = user;

      return (
        <>
          <Text mb="xs">自分のプロフィールを設定しましょう！</Text>
          <Text mb="lg">これらの項目は後から変更することも可能です。</Text>
          <ProfileEditor
            initialUser={{ name, slug, description, image }}
            variant="joined"
            onSavedHref="?p=2"
          />
        </>
      );
    case 2:
      return (
        <>
          <Text mb="xs">参加するワークスペースを選択しましょう！</Text>
          <Text mb="lg">
            これらのワークスペースには後から参加することも可能です。
          </Text>
          <Suspense
            fallback={
              <Group justify="center">
                <Loader />
              </Group>
            }
          >
            <WorkspaceSelector userId={user.id} />
          </Suspense>
        </>
      );
    case 3:
      return (
        <>
          <Text mb="lg">Digichatを利用する準備ができました！</Text>
          <FinishButton />
        </>
      );
    default: {
      return <></>;
    }
  }
};

export default JoinedSteps;
