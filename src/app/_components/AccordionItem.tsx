import {
  AccordionControl,
  AccordionPanel,
  Button,
  AccordionItem as MantineAccordionItem,
} from "@mantine/core";

import { IconWorld } from "@tabler/icons-react";
import Link from "next/link";
import styles from "./AccordionItem.module.css";

export type AccordionItemType = {
  title: string;
  id: string;
};

export type AccordionItemProps = {
  categoryName: string;
  channels: AccordionItemType[];
};

const AccordionItem: React.FC<AccordionItemProps> = ({
  categoryName,
  channels,
}) => {
  return (
    <MantineAccordionItem value={categoryName} className={styles.AccordionItem}>
      <AccordionControl className={styles.AccordionControl}>
        {categoryName}
      </AccordionControl>
      <AccordionPanel className={styles.AccordionPanel}>
        <ul className={styles.List}>
          {channels.map((item) => (
            <li key={item.id}>
              <Button
                radius={0}
                className={styles.Channel}
                component={Link}
                href={`/channels/${item.id}`}
                leftSection={<IconWorld />}
              >
                {item.title}
              </Button>
            </li>
          ))}
        </ul>
      </AccordionPanel>
    </MantineAccordionItem>
  );
};

export default AccordionItem;
