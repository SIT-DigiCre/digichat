import React from "react";

import {
  Table as MantineTable,
  TableTbody as MantineTableTbody,
  TableTd as MantineTableTd,
  TableTh as MantineTableTh,
  TableThead as MantineTableThead,
  TableTr as MantineTableTr,
} from "@mantine/core";

export const Table = ({ children }: React.ComponentProps<"table">) => {
  return <MantineTable>{children}</MantineTable>;
};

export const TableTr = ({ children }: React.ComponentProps<"tr">) => {
  return <MantineTableTr>{children}</MantineTableTr>;
};

export const TableTd = ({ children }: React.ComponentProps<"td">) => {
  return <MantineTableTd>{children}</MantineTableTd>;
};

export const TableTh = ({ children }: React.ComponentProps<"th">) => {
  return <MantineTableTh>{children}</MantineTableTh>;
};

export const TableThead = ({ children }: React.ComponentProps<"thead">) => {
  return <MantineTableThead>{children}</MantineTableThead>;
};

export const TableTbody = ({ children }: React.ComponentProps<"tbody">) => {
  return <MantineTableTbody>{children}</MantineTableTbody>;
};
