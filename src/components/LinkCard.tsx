"use client";

import { Card, Image, Text } from "@mantine/core";
import { useEffect, useState } from "react";

import styles from "./LinkCard.module.css";

type OGPData = {
  title: string;
  description: string;
  image: string;
  url: string;
};

type ApiResponse =
  | { status: "success"; data: { html: string } }
  | { status: "error"; message: string };

const LinkCard = ({ href }: { href: string }) => {
  const [ogpData, setOgpData] = useState<OGPData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOgpData = async () => {
      try {
        const response = await fetch(
          `/api/fetch-ogp?url=${encodeURIComponent(href)}`
        );
        const data: ApiResponse = await response.json();

        if (data.status === "success") {
          // クライアントサイドでDOMParserを使用してOGPデータを解析
          const parser = new DOMParser();
          const doc = parser.parseFromString(data.data.html, "text/html");
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
          console.log(doc.querySelector('meta[property="og:image"]'));
          setOgpData({
            title: ogTitle,
            description: ogDescription,
            image: ogImage,
            url: href,
          });
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("Failed to fetch OGP data");
      } finally {
        setLoading(false);
      }
    };

    fetchOgpData();
  }, [href]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  if (!ogpData) return <p>Failed to load OGP data.</p>;

  return (
    <Card
      shadow="sm"
      padding={0}
      component="a"
      href={ogpData.url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
    >
      <Card.Section className={styles["card-image-section"]}>
        {ogpData.image && (
          <Image
            src={ogpData.image}
            alt={ogpData.title}
            className={styles["card-image"]}
            fit="cover"
          />
        )}
      </Card.Section>
      <Card.Section className={styles["card-content-section"]}>
        <Text fw={500} size="lg">
          {ogpData.title}
        </Text>

        <Text mt="xs" c="dimmed" size="sm">
          {ogpData.description}
        </Text>
      </Card.Section>
    </Card>
  );
};

export default LinkCard;
