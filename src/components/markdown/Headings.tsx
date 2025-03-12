import { Title, TitleOrder } from "@mantine/core";

const Heading = ({
  order,
  children,
}: React.ComponentProps<"hgroup"> & {
  order: TitleOrder;
}) => {
  return <Title order={order}>{children}</Title>;
};

export const HeadingLevel1 = ({ children }: React.ComponentProps<"h1">) => {
  return <Heading order={1}>{children}</Heading>;
};

export const HeadingLevel2 = ({ children }: React.ComponentProps<"h2">) => {
  return <Heading order={2}>{children}</Heading>;
};

export const HeadingLevel3 = ({ children }: React.ComponentProps<"h3">) => {
  return <Heading order={3}>{children}</Heading>;
};

export const HeadingLevel4 = ({ children }: React.ComponentProps<"h4">) => {
  return <Heading order={4}>{children}</Heading>;
};

export const HeadingLevel5 = ({ children }: React.ComponentProps<"h5">) => {
  return <Heading order={5}>{children}</Heading>;
};

export const HeadingLevel6 = ({ children }: React.ComponentProps<"h6">) => {
  return <Heading order={6}>{children}</Heading>;
};
