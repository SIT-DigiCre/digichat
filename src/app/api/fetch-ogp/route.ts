import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      {
        status: "error",
        message: "URLパラメータは必須です",
      },
      { status: 400 }
    );
  }

  try {
    new URL(url);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        status: "error",
        message: "URLが不正です",
      },
      { status: 400 }
    );
  }

  const controller = new AbortController();
  const signal = controller.signal;
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 5000);

  try {
    // ref: https://github.com/traPtitech/traQ/blob/a8035bd3fac0fa4ae531d3b11c1ccbddc76822d2/service/ogp/parser/domain.go#L15
    // X(Twitter)のOGPを取得するのにuserAgentの中にbotという文字列が入っている必要がある
    // Spotifyの新しいOGPを取得するのにuserAgentの中にcurl-botという文字列が入っている必要がある
    const userAgent =
      "digichat-ogp-fetcher-curl-bot; contact: github.com/SIT-DigiCre/digichat";
    const response = await fetch(url, {
      headers: {
        "User-Agent": userAgent,
      },
      signal,
    });
    const html = await response.text();

    return NextResponse.json({
      status: "success",
      html,
    });
  } catch (error) {
    console.error(error);
    if (signal.aborted) {
      return NextResponse.json(
        {
          status: "error",
          message: "リクエストがタイムアウトしました",
        },
        { status: 504 }
      );
    } else {
      return NextResponse.json(
        {
          status: "error",
          message: "ページ情報を取得できませんでした",
        },
        { status: 500 }
      );
    }
  } finally {
    clearTimeout(timeoutId);
  }
}
