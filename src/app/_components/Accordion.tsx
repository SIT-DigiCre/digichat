import { Accordion as MantineAccordion } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import AccordionItem, { AccordionItemProps } from "./AccordionItem";

import styles from "./Accordion.module.css";

const categories: AccordionItemProps[] = [
  {
    categoryName: "General",
    channels: [
      { title: "announcements", id: "1" },
      { title: "random", id: "2" },
      { title: "welcome", id: "3" },
    ],
  },
  {
    categoryName: "Development",
    channels: [
      { title: "frontend", id: "4" },
      { title: "backend", id: "5" },
      { title: "devops", id: "6" },
    ],
  },
  {
    categoryName: "Design",
    channels: [
      { title: "ui", id: "7" },
      { title: "ux", id: "8" },
      { title: "branding", id: "9" },
    ],
  },
  {
    categoryName: "Marketing",
    channels: [
      { title: "seo", id: "10" },
      { title: "social media", id: "11" },
      { title: "content", id: "12" },
    ],
  },
  {
    categoryName: "Support",
    channels: [
      { title: "help", id: "13" },
      { title: "questions", id: "14" },
      { title: "feedback", id: "15" },
    ],
  },
];

const Accordion = () => {
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
      {categories.map((category) => (
        <AccordionItem
          key={category.categoryName}
          channels={category.channels}
          categoryName={category.categoryName}
        />
      ))}
    </MantineAccordion>
  );
};

export default Accordion;
