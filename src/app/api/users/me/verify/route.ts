import { NextResponse } from "next/server";

import { getCurrentUser, isVerifiedUser } from "#/libs/user";
import { verifyUser } from "#/repositories/user";

/**
 * ユーザーを仮登録状態から本登録状態にする
 */
export async function POST() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { error: "ログインしてください" },
      { status: 401 }
    );
  }

  // 本登録済みの場合は登録処理(verifiedAtの上書き)をしない
  if (isVerifiedUser(user)) {
    return NextResponse.json(
      { message: "すでに本登録済みです" },
      { status: 409 }
    );
  }

  try {
    await verifyUser(user.id);
    return NextResponse.json(
      { message: "本登録が完了しました" },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "サーバーで問題が発生しました" },
      { status: 500 }
    );
  }
}
