import { Title, TitleOrder } from "@mantine/core";

const Heading = (
  props: React.HTMLAttributes<HTMLHeadingElement> & {
    order: TitleOrder;
  }
) => {
  return <Title {...props} />;
};

export const HeadingLevel1 = (
  props: React.HTMLAttributes<HTMLHeadingElement>
) => {
  return <Heading order={1} {...props} />;
};

export const HeadingLevel2 = (
  props: React.HTMLAttributes<HTMLHeadingElement>
) => {
  return <Heading order={2} {...props} />;
};

export const HeadingLevel3 = (
  props: React.HTMLAttributes<HTMLHeadingElement>
) => {
  return <Heading order={3} {...props} />;
};

export const HeadingLevel4 = (
  props: React.HTMLAttributes<HTMLHeadingElement>
) => {
  return <Heading order={4} {...props} />;
};

export const HeadingLevel5 = (
  props: React.HTMLAttributes<HTMLHeadingElement>
) => {
  return <Heading order={5} {...props} />;
};

export const HeadingLevel6 = (
  props: React.HTMLAttributes<HTMLHeadingElement>
) => {
  return <Heading order={6} {...props} />;
};
