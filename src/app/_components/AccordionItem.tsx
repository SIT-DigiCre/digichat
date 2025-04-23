import Link from "next/link";

import {
  AccordionControl,
  AccordionPanel,
  Button,
  AccordionItem as MantineAccordionItem,
} from "@mantine/core";
import { IconWorld } from "@tabler/icons-react";

import styles from "./AccordionItem.module.css";

import { ChannelMemberWithChannel } from "#/types/prisma";

export type AccordionItemProps = {
  name: string;
  channelMembers: ChannelMemberWithChannel[];
};

const AccordionItem: React.FC<AccordionItemProps> = ({
  name,
  channelMembers,
}) => {
  return (
    <MantineAccordionItem value={name}>
      <AccordionControl>{name}</AccordionControl>
      <AccordionPanel>
        <ul className={styles.List}>
          {channelMembers.map((item) => (
            <li key={item.channelId}>
              <Button
                radius={0}
                className={styles.Channel}
                component={Link}
                href={`/channels/${item.channelId}`}
                leftSection={<IconWorld size={20} />}
              >
                {item.channel.slug}
              </Button>
            </li>
          ))}
        </ul>
      </AccordionPanel>
    </MantineAccordionItem>
  );
};

export default AccordionItem;
