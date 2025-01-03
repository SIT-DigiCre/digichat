import { NextRequest, NextResponse } from "next/server";

export type FetchOGPResponse =
  | {
      status: "success";
      data: {
        title: string;
        description: string;
        image: string;
      };
    }
  | {
      status: "error";
      message: string;
    };

export async function GET(
  request: NextRequest
): Promise<NextResponse<FetchOGPResponse>> {
  const { searchParams } = request.nextUrl;
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { status: "error", message: "Missing 'url' query parameter" } as const,
      { status: 400 }
    );
  }

  try {
    const res = await fetch(url, { method: "GET" });
    const html = await res.text();

    // DOMParserを使用してHTMLを解析
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const title =
      doc.querySelector("meta[property='og:title']")?.getAttribute("content") ||
      doc.querySelector("title")?.textContent ||
      "No Title";
    const description =
      doc
        .querySelector("meta[property='og:description']")
        ?.getAttribute("content") || "No Description";
    const image =
      doc.querySelector("meta[property='og:image']")?.getAttribute("content") ||
      "";

    return NextResponse.json({
      status: "success",
      data: { title, description, image },
    });
  } catch (error) {
    console.error("Error fetching OGP data:", error);
    return NextResponse.json(
      { status: "error", message: "Error fetching OGP data" } as const,
      { status: 500 }
    );
  }
}
