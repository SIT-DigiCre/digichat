"use client";

import { useEffect } from "react";

import { Accordion as MantineAccordion } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

import styles from "./Accordion.module.css";
import AccordionItem from "./AccordionItem";
import { useChannelsAccordion } from "./ChannelsAccordionProvider";

const Accordion = () => {
  const { accordionItems, refreshChannelList } = useChannelsAccordion();

  useEffect(() => {
    refreshChannelList();
  }, [refreshChannelList]);

  return (
    <MantineAccordion
      multiple
      chevronPosition="left"
      classNames={{
        root: styles.root,
        item: styles.Item,
        control: styles.Control,
        label: styles.Label,
        chevron: styles.Chevron,
        content: styles.Content,
        panel: styles.Panel,
      }}
      chevron={<IconChevronRight size={20} />}
    >
      {accordionItems.map((category) => (
        <AccordionItem
          key={category.name}
          channelMembers={category.channelMembers}
          name={category.name}
        />
      ))}
    </MantineAccordion>
  );
};

export default Accordion;
