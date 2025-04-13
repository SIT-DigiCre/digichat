"use client";

import { useEffect, useState } from "react";

import { Loader, Accordion as MantineAccordion } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useSession } from "next-auth/react";

import styles from "./Accordion.module.css";
import AccordionItem, { AccordionItemProps } from "./AccordionItem";

import { getChannelAccordionItems } from "#/libs/actions";

const Accordion = () => {
  const [accordionItems, setAccordionItems] = useState<AccordionItemProps[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchCategories = async () => {
      if (!session || !session.user.id) return;

      setIsLoading(true);
      try {
        const result = await getChannelAccordionItems(session.user.id);

        if (!result) throw new Error("チャンネル一覧の取得に失敗しました");

        setAccordionItems(result);
      } catch {
        setAccordionItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchCategories();
  }, [session]);

  if (isLoading) return <Loader color="#FFFA" size="sm" m="auto" />;

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
