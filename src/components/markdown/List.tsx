import React, { Children, isValidElement } from "react";

import { Checkbox, List, ListItem as MantineListItem } from "@mantine/core";

import styles from "./List.module.css";

export const UnorderedList = ({ children }: React.ComponentProps<"ul">) => {
  return <List withPadding>{children}</List>;
};

export const OrderedList = ({ children }: React.ComponentProps<"ol">) => {
  return (
    <List withPadding type="ordered">
      {children}
    </List>
  );
};

export const ListItem = ({ children }: React.ComponentProps<"li">) => {
  const listedChildren = Children.toArray(children);
  if (isValidElement(listedChildren[0]) && listedChildren[0].type === "input") {
    const [inputElementRaw, ...contents] = listedChildren;
    const inputElement =
      inputElementRaw as React.ReactElement<HTMLInputElement>;

    if (inputElement.props.type === "checkbox") {
      return (
        // module.css による指定だと正しく反映されないため
        <MantineListItem
          style={{
            position: "relative",
            paddingRight: "1.5rem",
          }}
        >
          <Checkbox
            readOnly
            size="sm"
            color="gray"
            checked={inputElement.props.checked}
            className={styles["checkbox"]}
          />
          {contents}
        </MantineListItem>
      );
    }
  }

  return (
    // module.css による指定だと正しく反映されないため
    <MantineListItem
      style={{
        paddingRight: "1.5rem",
      }}
    >
      {children}
    </MantineListItem>
  );
};
