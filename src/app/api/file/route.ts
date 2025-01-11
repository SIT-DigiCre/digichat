import { NextRequest, NextResponse } from "next/server";

import { v4 as uuidv4 } from "uuid";

import { uploadFileToWasabi } from "#/libs/wasabi";

export async function POST(request: NextRequest) {
  // FIXME: 後で認証機能を追加する

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "ファイルが見つかりません" },
        { status: 400 }
      );
    }

    // 100MBの制限をチェック
    const MAX_SIZE = 100 * 1024 * 1024; // 100MB in bytes
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "ファイルサイズは100MB以下にしてください" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const fileExtension = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;

    const fileUrl = await uploadFileToWasabi(
      buffer,
      process.env.WASABI_BUCKET_NAME || "",
      fileName
    );

    return NextResponse.json({ url: fileUrl }, { status: 200 });
  } catch (error) {
    console.error("ファイルアップロードエラー:", error);
    return NextResponse.json(
      { error: "ファイルのアップロードに失敗しました" },
      { status: 500 }
    );
  }
}
