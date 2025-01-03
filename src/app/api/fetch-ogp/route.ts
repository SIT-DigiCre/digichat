import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  console.log(url);

  if (!url) {
    return NextResponse.json(
      {
        status: "error",
        message: "URL is required",
      },
      { status: 400 }
    );
  }

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
    });
    const html = await response.text();
    console.log(html);

    return NextResponse.json({
      status: "success",
      data: { html },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch HTML",
      },
      { status: 500 }
    );
  }
}
