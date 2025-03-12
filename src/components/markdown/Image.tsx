import NextImage from "next/image";

import { Image as MantineImage } from "@mantine/core";

const Image = (props: React.ComponentProps<"img">) => {
  const { width, height, alt, src, ...others } = props;
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
        {...others}
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
        {...others}
      />
    );
  }
};

export default Image;
