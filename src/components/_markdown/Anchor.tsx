import Link from "next/link";

import { Anchor as MantineAnchor } from "@mantine/core";

const Anchor = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  // TODO: .env等を利用して同一ドメインの場合の判定もできるように
  if (props.href?.startsWith("/")) {
    return (
      <MantineAnchor component={Link} {...props} href={props.href ?? ""} />
    );
  } else {
    return (
      <MantineAnchor
        component={"a"}
        {...props}
        target="_blank"
        rel="noreferrer noopener"
      />
    );
  }
};

export default Anchor;
