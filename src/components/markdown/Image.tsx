import NextImage from "next/image";

import { Image as MantineImage } from "@mantine/core";

const Image = ({ width, height, alt, src }: React.ComponentProps<"img">) => {
  if (width && height && alt && src) {
    return (
      <MantineImage
        component={NextImage}
        width={Number(width)}
        height={Number(height)}
        src={src}
        alt={alt}
        maw="100%"
        w="auto"
        mah={360}
      />
    );
  } else {
    return (
      <MantineImage
        src={src}
        alt={alt ?? ""}
        display="inline-block"
        maw="100%"
        w="auto"
        mah={360}
      />
    );
  }
};

export default Image;
