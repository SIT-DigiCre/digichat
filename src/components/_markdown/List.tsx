import React, { Children, isValidElement } from "react";

import { Checkbox, List, ListItem as MantineListItem } from "@mantine/core";

import styles from "./List.module.css";

export const UnorderedList = (
  props: React.HTMLAttributes<HTMLUListElement>
) => {
  return <List {...props} withPadding />;
};

export const OrderedList = (props: React.HTMLAttributes<HTMLOListElement>) => {
  return <List {...props} withPadding type="ordered" />;
};

export const ListItem = (props: React.HTMLAttributes<HTMLLIElement>) => {
  const { children, ...others } = props;

  const listedChildren = Children.toArray(children);
  if (isValidElement(listedChildren[0]) && listedChildren[0].type === "input") {
    const [inputElementRaw, ...contents] = listedChildren;
    const inputElement =
      inputElementRaw as React.ReactElement<HTMLInputElement>;

    if (inputElement.props.type === "checkbox") {
      return (
        <MantineListItem
          style={{
            position: "relative",
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

  return <MantineListItem {...others}>{children}</MantineListItem>;
};
