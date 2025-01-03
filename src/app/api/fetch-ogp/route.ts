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
    const response = await fetch(url);
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
