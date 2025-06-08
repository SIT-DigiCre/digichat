import { Title, TitleOrder } from "@mantine/core";

const Heading = (
  props: React.ComponentProps<"h1"> & {
    order: TitleOrder;
  }
) => {
  return <Title {...props} />;
};

export const HeadingLevel1 = (props: React.ComponentProps<"h1">) => {
  return <Heading order={1} {...props} />;
};

export const HeadingLevel2 = (props: React.ComponentProps<"h2">) => {
  return <Heading order={2} {...props} />;
};

export const HeadingLevel3 = (props: React.ComponentProps<"h3">) => {
  return <Heading order={3} {...props} />;
};

export const HeadingLevel4 = (props: React.ComponentProps<"h4">) => {
  return <Heading order={4} {...props} />;
};

export const HeadingLevel5 = (props: React.ComponentProps<"h5">) => {
  return <Heading order={5} {...props} />;
};

export const HeadingLevel6 = (props: React.ComponentProps<"h6">) => {
  return <Heading order={6} {...props} />;
};
