import { Box, Flex, Image } from "@mantine/core";
import { Asset } from "@prisma/client";

const MediaView = (props: {
  assets: Pick<Asset, "id" | "type" | "url">[];
  className?: string;
}) => {
  if (props.assets.length === 0) return null;
  if (props.assets.length > 1) {
    return (
      <Flex dir="row" wrap="wrap" gap="md" className={props.className}>
        {props.assets.map(
          (item) =>
            item.type === "IMAGE" && (
              <Image
                src={item.url}
                alt=""
                key={item.id}
                radius="md"
                mah={240}
                maw="100%"
                w="auto"
                fit="contain"
              />
            )
        )}
      </Flex>
    );
  } else {
    return (
      <Box className={props.className}>
        <Image
          src={props.assets[0].url}
          alt=""
          key={props.assets[0].id}
          radius="md"
          mah={360}
          maw="100%"
          w="auto"
          fit="contain"
        />
      </Box>
    );
  }
};

export default MediaView;
