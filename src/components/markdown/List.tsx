import React, { Children, isValidElement } from "react";

import { Checkbox, List, ListItem as MantineListItem } from "@mantine/core";

import styles from "./List.module.css";

export const UnorderedList = (props: React.ComponentProps<"ul">) => {
  return <List withPadding {...props} />;
};

export const OrderedList = (
  props: Omit<React.ComponentProps<"ol">, "type">
) => {
  return <List withPadding type="ordered" {...props} />;
};

export const ListItem = (props: React.ComponentProps<"li">) => {
  const { children, style, ...others } = props;
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
            ...style,
          }}
          {...others}
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
        ...style,
      }}
      {...others}
    >
      {children}
    </MantineListItem>
  );
};
