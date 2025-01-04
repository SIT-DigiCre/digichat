type APIResponse =
  | { status: "success"; html: string }
  | { status: "error"; message: string };

// DOMParserはクライアント側でしか利用できないため、HTML取得後の処理はクライアント側で行う
export const fetchOGPData = async (href: string) => {
  try {
    const response = await fetch(
      `/api/fetch-ogp?url=${encodeURIComponent(href)}`
    );
    const data: APIResponse = await response.json();

    if (data.status === "success") {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.html, "text/html");

      // タイトル: og:title > title > URL
      const ogTitleElement = doc.querySelector(
        'meta[property="og:title"]'
      ) as HTMLMetaElement | null;
      const title = ogTitleElement?.content || doc.title || href;

      // 説明文: og:description > description > body.textContent
      const ogDescriptionElement = doc.querySelector(
        'meta[property="og:description"]'
      ) as HTMLMetaElement | null;
      const descriptionElement = doc.querySelector(
        'meta[name="description"]'
      ) as HTMLMetaElement | null;
      const textContent = doc.body.textContent;
      const description =
        ogDescriptionElement?.content ||
        descriptionElement?.content ||
        textContent?.slice(0, 100) ||
        "No Content";

      const ogImageElement = doc.querySelector(
        'meta[property="og:image"]'
      ) as HTMLMetaElement | null;
      const image = ogImageElement?.content || null;

      return {
        title,
        description,
        image,
        url: href,
      };
    } else {
      // サーバーサイドで取得に際し何らかのエラーが発生した場合、またはタイムアウトした場合
      return {
        title: href,
        description: data.message,
        image: null,
        url: href,
      };
    }
  } catch (error) {
    // サーバーサイドへのリクエストに失敗した場合
    console.error(error);
    return {
      title: href,
      description:
        "OGPの取得に失敗しました。コンソールログを確認してください。",
      image: null,
      url: href,
    };
  }
};
