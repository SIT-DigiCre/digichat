type APIResponse =
  | { status: "success"; html: string }
  | { status: "error"; message: string };

export const fetchOGPData = async (href: string) => {
  try {
    const response = await fetch(
      `/api/fetch-ogp?url=${encodeURIComponent(href)}`
    );
    const data: APIResponse = await response.json();

    if (data.status === "success") {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.html, "text/html");
      const ogTitle =
        (doc.querySelector('meta[property="og:title"]') as HTMLMetaElement)
          ?.content || "No title";
      const ogDescription =
        (
          doc.querySelector(
            'meta[property="og:description"]'
          ) as HTMLMetaElement
        )?.content || "No description";
      const ogImage =
        (doc.querySelector('meta[property="og:image"]') as HTMLMetaElement)
          ?.content || "";
      return {
        title: ogTitle,
        description: ogDescription,
        image: ogImage,
        url: href,
      };
    } else {
      return {
        title: href,
        description: data.message,
        image: null,
        url: href,
      };
    }
  } catch (error) {
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
