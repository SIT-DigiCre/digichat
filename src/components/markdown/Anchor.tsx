import Link from "next/link";

import { Anchor as MantineAnchor } from "@mantine/core";

const Anchor = ({ href, children }: React.ComponentProps<"a">) => {
  // TODO: .env等を利用して同一ドメインの場合の判定もできるように
  if (href?.startsWith("/")) {
    return (
      <MantineAnchor component={Link} href={href ?? ""}>
        {children}
      </MantineAnchor>
    );
  } else {
    return (
      <MantineAnchor
        component={"a"}
        href={href ?? ""}
        target="_blank"
        rel="noreferrer noopener"
      >
        {children}
      </MantineAnchor>
    );
  }
};

export default Anchor;
