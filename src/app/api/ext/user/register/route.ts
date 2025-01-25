import { NextRequest, NextResponse } from "next/server";

import { prisma } from "#/libs/prisma";
import { isValidEmail } from "#/libs/user";
import { createUser, getUserByEmail, getUserBySlug } from "#/repositories/user";

type ExtCreateUserRequestParams = {
  name?: string;
  email?: string;
  slug?: string;
};

// 仮登録状態のユーザーを作成する デジコアからのアクセスを想定
export async function POST(request: NextRequest) {
  const authToken = request.headers.get("Authorization");
  if (authToken !== process.env.EXT_API_SECRET) {
    return NextResponse.json(
      { error: "アクセス権限がありません" },
      { status: 403 }
    );
  }

  const { name, email, slug }: ExtCreateUserRequestParams =
    await request.json();

  if (!name || !email || !slug) {
    return NextResponse.json(
      { error: "必須項目が不足しています" },
      { status: 400 }
    );
  }

  // ユーザー情報の要件をチェック
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "メールアドレスが不正です" },
      { status: 400 }
    );
  }

  // Unique制約に引っ掛からないかチェック
  const [existingUserByEmail, existingUserBySlug] = await Promise.all([
    getUserByEmail(email),
    getUserBySlug(slug),
  ]);

  if (existingUserByEmail) {
    return NextResponse.json(
      { error: "既にこのメールアドレスは使われています" },
      { status: 400 }
    );
  }

  if (existingUserBySlug) {
    return NextResponse.json(
      { error: "既にこのスラッグは使われています" },
      { status: 400 }
    );
  }

  // 初期ロールのIDを取得(仮)
  // TODO: ロールの仕様をちゃんと詰め次第置き換える
  let role = await prisma.userRole.findFirst({
    where: {
      name: "TEST",
    },
  });
  if (!role) {
    role = await prisma.userRole.create({
      data: {
        name: "TEST",
        permissions: {},
      },
    });
  }

  // ユーザーを仮登録状態で作成
  try {
    await createUser(email, name, slug, role.id);

    return NextResponse.json(
      { message: "ユーザーを作成しました" },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "ユーザー作成中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
