"use client";

import { Card, Image, Skeleton, Text } from "@mantine/core";
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
  const [ogpData, setOGPData] = useState<OGPData | null>(null);

  useEffect(() => {
    const fetchOgpData = async () => {
      try {
        const response = await fetch(
          `/api/fetch-ogp?url=${encodeURIComponent(href)}`
        );
        const data: ApiResponse = await response.json();

        if (data.status === "success") {
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
          setOGPData({
            title: ogTitle,
            description: ogDescription,
            image: ogImage,
            url: href,
          });
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchOgpData();
  }, [href]);

  return (
    <Card
      shadow="sm"
      padding={0}
      component="a"
      href={ogpData?.url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
    >
      <Card.Section className={styles["card-image-section"]}>
        {ogpData ? (
          <Image
            src={ogpData?.image}
            alt={ogpData?.title}
            className={styles["card-image"]}
            fit="cover"
          />
        ) : (
          <Skeleton height={200} radius={0} />
        )}
      </Card.Section>
      <Card.Section className={styles["card-content-section"]}>
        {ogpData ? (
          <Text className={styles["card-title"]}>{ogpData.title}</Text>
        ) : (
          <Skeleton height={30} />
        )}
        {ogpData ? (
          <Text className={styles["card-description"]}>
            {ogpData.description}
          </Text>
        ) : (
          <Skeleton height={64} mt="sm" />
        )}
      </Card.Section>
    </Card>
  );
};

export default LinkCard;
