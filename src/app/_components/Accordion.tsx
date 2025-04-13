"use client";

import { useEffect, useState } from "react";

import { Accordion as MantineAccordion } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useSession } from "next-auth/react";

import styles from "./Accordion.module.css";
import AccordionItem, { AccordionItemProps } from "./AccordionItem";

import { getCategories } from "#/libs/actions";

const Accordion = () => {
  const [accordionItems, setAccordionItems] = useState<AccordionItemProps[]>(
    []
  );

  const { data: session } = useSession();

  useEffect(() => {
    const fetchCategories = async () => {
      if (!session || !session.user.id) return;

      try {
        const result = await getCategories(session.user.id);

        if (!result) throw new Error("チャンネル一覧の取得に失敗しました");

        setAccordionItems([
          {
            name: "チャンネル",
            channelMembers: result.uncategorizedChannelMembers,
          },
          ...result.categories.map((category) => {
            return {
              name: category.name,
              channelMembers: category.channelMembers,
            } satisfies AccordionItemProps;
          }),
        ]);
      } catch {
        setAccordionItems([]);
      }
    };

    void fetchCategories();
  }, [session]);

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
