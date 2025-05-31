import { NextRequest, NextResponse } from "next/server";

import { getCurrentUser } from "#/libs/user";
import { getUserBySlug, updateUserProfile } from "#/repositories/user";

export type UpdateUserProfileRequest = {
  name?: string;
  slug?: string;
  image?: string;
  description?: string;
};

/**
 * ユーザーのプロフィールを更新する
 */
export async function PATCH(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { error: "ログインしてください" },
      { status: 401 }
    );
  }

  const {
    name,
    slug,
    image: imageRaw,
    description: descriptionRaw,
  }: UpdateUserProfileRequest = await request.json();

  if (!name || !slug) {
    return NextResponse.json(
      { error: "必須項目が不足しています" },
      { status: 400 }
    );
  }

  // image と description について、空文字列か undefined なら null に変換する
  const image = !imageRaw ? null : imageRaw;
  const description = !descriptionRaw ? null : descriptionRaw;

  // slug の unique 制約を検証
  const existingUserBySlug = await getUserBySlug(slug);
  if (existingUserBySlug && existingUserBySlug.id !== user.id) {
    return NextResponse.json(
      { error: "既にこのスラッグは使われています" },
      { status: 400 }
    );
  }

  // ユーザーのプロフィールを更新
  try {
    await updateUserProfile(user.id, name, slug, image, description);

    return NextResponse.json(
      { message: "ユーザーのプロフィールを更新しました" },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "ユーザーのプロフィールを更新中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
