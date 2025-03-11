import NextImage from "next/image";

import { Image as MantineImage } from "@mantine/core";

const Image = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  if (props.width && props.height && props.alt && props.src) {
    const { width, height, src, alt, ...others } = props;
    return (
      <MantineImage
        component={NextImage}
        width={Number(width)}
        height={Number(height)}
        alt={alt}
        src={src}
        maw="100%"
        w="auto"
        mah={360}
        {...others}
      />
    );
  } else {
    return (
      <MantineImage
        {...props}
        display="inline-block"
        maw="100%"
        w="auto"
        mah={360}
        alt={props.alt ?? ""}
      />
    );
  }
};

export default Image;
