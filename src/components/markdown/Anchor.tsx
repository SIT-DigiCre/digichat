import Link from "next/link";

import { Anchor as MantineAnchor } from "@mantine/core";

const Anchor = (props: React.ComponentProps<"a">) => {
  const { href, ...others } = props;
  // TODO: .env等を利用して同一ドメインの場合の判定もできるように
  if (href?.startsWith("/")) {
    return <MantineAnchor component={Link} href={href ?? ""} {...others} />;
  } else {
    return (
      <MantineAnchor
        component={"a"}
        href={href ?? ""}
        target="_blank"
        rel="noreferrer noopener"
        {...others}
      />
    );
  }
};

export default Anchor;
