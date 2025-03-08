import NextImage from "next/image";

const Image = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  if (props.width && props.height && props.alt && props.src) {
    const { width, height, src, alt, ...others } = props;
    return (
      <NextImage
        width={Number(width)}
        height={Number(height)}
        alt={alt}
        src={src}
        {...others}
      />
    );
  } else {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt ?? ""} />;
  }
};

export default Image;
