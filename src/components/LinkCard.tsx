import { FetchOGPResponse } from "#/app/api/fetch-ogp";
import { Card, Image, Text } from "@mantine/core";

type LinkCardProps = {
  href: string;
};

const LinkCard: React.FC<LinkCardProps> = async ({ href }) => {
  const escapedHref = new URLSearchParams({ url: href }).toString();
  const response: FetchOGPResponse = await (
    await fetch(`/api/fetch-ogp?url=${escapedHref}`)
  ).json();

  return (
    <Card shadow="sm" padding="xl" component="a" href={href} target="_blank">
      <Card.Section>
        <Image
          src={response.status === "success" ? response.data.image : ""}
          h={160}
          alt="No way!"
        />
      </Card.Section>

      <Text fw={500} size="lg" mt="md">
        {response.status === "success" ? response.data.title : "No Title"}
      </Text>

      <Text mt="xs" c="dimmed" size="sm">
        {response.status === "success"
          ? response.data.description
          : "No Description"}
      </Text>
    </Card>
  );
};

export default LinkCard;
