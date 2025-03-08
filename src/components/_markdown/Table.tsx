import React from "react";

import {
  Table as MantineTable,
  TableTbody as MantineTableTbody,
  TableTd as MantineTableTd,
  TableTh as MantineTableTh,
  TableThead as MantineTableThead,
  TableTr as MantineTableTr,
} from "@mantine/core";

export const Table = (props: React.HTMLAttributes<HTMLTableElement>) => {
  return <MantineTable {...props} />;
};

export const TableTr = (props: React.HTMLAttributes<HTMLTableRowElement>) => {
  return <MantineTableTr {...props} />;
};

export const TableTd = (props: React.HTMLAttributes<HTMLTableCellElement>) => {
  return <MantineTableTd {...props} />;
};

export const TableTh = (props: React.HTMLAttributes<HTMLTableCellElement>) => {
  return <MantineTableTh {...props} />;
};

export const TableThead = (
  props: React.HTMLAttributes<HTMLTableSectionElement>
) => {
  return <MantineTableThead {...props} />;
};

export const TableTbody = (
  props: React.HTMLAttributes<HTMLTableSectionElement>
) => {
  return <MantineTableTbody {...props} />;
};
