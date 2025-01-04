"use client";

import { Card, Image, Skeleton, Text } from "@mantine/core";
import { useEffect, useState } from "react";

import { fetchOGPData } from "#/libs/fetch-ogp";
import styles from "./LinkCard.module.css";

type OGPData = {
  title: string;
  description: string;
  image: string | null;
  url: string;
};

const LinkCard = ({ href }: { href: string }) => {
  const [OGPData, setOGPData] = useState<OGPData | null>(null);

  useEffect(() => {
    fetchOGPData(href).then((data) => {
      setOGPData(data);
    });
  }, [href]);

  return (
    <Card
      shadow="sm"
      padding={0}
      className={styles.card}
      data-noimage={OGPData?.image ? "false" : "true"}
      component="a"
      href={OGPData?.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Card.Section className={styles["card-content-section"]}>
        {OGPData ? (
          <Text className={styles["card-title"]}>{OGPData.title}</Text>
        ) : (
          <Skeleton height={30} />
        )}
        {OGPData ? (
          <Text className={styles["card-description"]}>
            {OGPData.description}
          </Text>
        ) : (
          <Skeleton height={64} mt="sm" />
        )}
      </Card.Section>
      <Card.Section className={styles["card-image-section"]}>
        {OGPData ? (
          OGPData.image && (
            <Image
              src={OGPData.image}
              alt={OGPData.title}
              className={styles["card-image"]}
              fit="cover"
            />
          )
        ) : (
          <Skeleton height={200} radius={0} />
        )}
      </Card.Section>
    </Card>
  );
};

export default LinkCard;
