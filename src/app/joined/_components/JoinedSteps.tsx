import Link from "next/link";
import { use } from "react";

import { Button, Space, Text } from "@mantine/core";

import FinishButton from "./FinishButton";

import ProfileEditor from "#/components/ProfileEditor";
import { getCurrentUser } from "#/libs/user";
import { EditableUserParams } from "#/types/prisma";

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
      const user = use(getCurrentUser());
      if (!user) return <>ユーザーの取得に失敗しました</>;
      const { name, slug, description, image }: EditableUserParams = user;

      return (
        <>
          <Text>自分のプロフィールを設定しましょう！</Text>
          <Text>これらの項目は後から変更することも可能です。</Text>
          <Space h="sm" />
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
          <Text>仮置き</Text>
          <Space h="xl" />
          <Button component={Link} href={"?p=3"}>
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
