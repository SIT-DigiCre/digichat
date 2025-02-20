"use client";

import { useRouter } from "next/navigation";
import { useActionState, useCallback } from "react";

import {
  Alert,
  Avatar,
  Button,
  Fieldset,
  Group,
  Space,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { IconAlertCircle, IconAt } from "@tabler/icons-react";
import { JWT } from "next-auth/jwt";
import { UpdateSession, useSession } from "next-auth/react";

import { EditableUserParams } from "#/types/prisma";

export type UserProfileEditorProps = {
  initialUser: EditableUserParams;
  variant: "default" | "joined";
  onSavedHref: string;
};

type ProfileEditorFormState = {
  message?: string;
  fieldErrors?: { [K in keyof EditableUserParams]?: string };
  payload?: { [K in keyof EditableUserParams]?: string };
};

const updateProfile = async (
  updateSession: UpdateSession,
  onSaved: () => void,
  _: ProfileEditorFormState,
  formData: FormData
): Promise<ProfileEditorFormState> => {
  const name = formData.get("name")?.toString() ?? "";
  const slug = formData.get("slug")?.toString() ?? "";
  const image = formData.get("image")?.toString() ?? "";
  const description = formData.get("description")?.toString() ?? "";

  // action 後にフォームがリセットされてしまうので入力値を保持
  const payload = {
    name,
    slug,
    image,
    description,
  };

  if (!name || !slug) {
    return {
      message: "* が付いている項目を全て入力してください",
      fieldErrors: {
        name: !name ? "表示名が入力されていません" : undefined,
        slug: !slug ? "ユーザー名が入力されていません" : undefined,
      },
      payload,
    };
  }

  try {
    const res = await fetch("/api/users/me", {
      method: "PATCH",
      body: JSON.stringify({
        name,
        slug,
        image,
        description,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      return {
        message: data.error,
        payload,
      };
    }
  } catch (e) {
    console.error(e);
    return {
      message: "予期せぬエラーが発生しました",
      payload,
    };
  }

  await updateSession({
    name,
    picture: image,
  } satisfies Pick<JWT, "name" | "picture">);

  onSaved();

  return {
    payload,
  };
};

const ProfileEditor = (props: UserProfileEditorProps) => {
  const { update } = useSession();
  const router = useRouter();
  const { initialUser, variant, onSavedHref } = props;

  const onSaved = useCallback(() => {
    if (variant === "joined") {
      router.push(onSavedHref);
      router.refresh();
    }
  }, [onSavedHref, router, variant]);

  const updateProfileAction = updateProfile
    .bind(null, update)
    .bind(null, onSaved);

  const [formState, action, isPending] = useActionState(updateProfileAction, {
    message: "",
    payload: {
      name: initialUser.name,
      slug: initialUser.slug,
      description: initialUser.description ?? undefined,
      image: initialUser.image ?? undefined,
    },
  });

  return (
    <>
      {formState.message && (
        <Alert
          variant="light"
          color="red"
          title="プロフィール更新失敗"
          icon={<IconAlertCircle />}
          mb="sm"
        >
          {formState.message}
        </Alert>
      )}
      <form action={action}>
        <Fieldset legend="プロフィール">
          <Text size="sm">アバター</Text>
          <Avatar size="xl" src={formState?.payload?.image} />
          <input
            type="hidden"
            name="image"
            defaultValue={formState?.payload?.image}
          />
          {/* TODO: アバターのアップロード機能を作成 */}
          <Space h="sm" />
          <TextInput
            name="name"
            defaultValue={formState?.payload?.name}
            label="表示名"
            withAsterisk
            error={formState?.fieldErrors?.name}
          />
          <Space h="sm" />
          <TextInput
            name="slug"
            defaultValue={formState?.payload?.slug}
            label="スラッグ"
            description="他の部員と同じスラッグは使用できません"
            leftSection={<IconAt size="1rem" />}
            withAsterisk
            error={formState?.fieldErrors?.slug}
          />
          <Space h="sm" />
          <Textarea
            name="description"
            defaultValue={formState?.payload?.description}
            label="自己紹介"
            placeholder="例：どんな活動をしているか(所属班)、期、役職、個人サイトへのリンクなど"
          />
          <Group justify="end" mt="xl">
            <Button type="submit" loading={isPending}>
              {variant === "joined" ? "保存して次へ" : "保存"}
            </Button>
          </Group>
        </Fieldset>
      </form>
    </>
  );
};

export default ProfileEditor;
