import Link from "next/link";
import { Suspense } from "react";

import { Button, Group, Loader, Space, Text } from "@mantine/core";

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
          <Text>Digichatへようこそ！</Text>
          <Space h="xs" />
          <Text>Digichatで交流するための準備を始めましょう！</Text>
          <Space h="xl" />
          <Button component={Link} href="?p=1">
            次へ
          </Button>
        </>
      );
    case 1:
      const { name, slug, description, image }: EditableUserParams = user;

      return (
        <>
          <Text>自分のプロフィールを設定しましょう！</Text>
          <Space h="xs" />
          <Text>これらの項目は後から変更することも可能です。</Text>
          <Space h="xl" />
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
          <Text>参加するワークスペースを選択しましょう！</Text>
          <Space h="xs" />
          <Text>これらのワークスペースには後から参加することも可能です。</Text>
          <Space h="xl" />
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
          <Text>Digichatを利用する準備ができました！</Text>
          <Space h="xl" />
          <FinishButton />
        </>
      );
    default: {
      return <></>;
    }
  }
};

export default JoinedSteps;
