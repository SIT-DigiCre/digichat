import React from "react";

import {
  Table as MantineTable,
  TableTbody as MantineTableTbody,
  TableTd as MantineTableTd,
  TableTh as MantineTableTh,
  TableThead as MantineTableThead,
  TableTr as MantineTableTr,
} from "@mantine/core";

export const Table = (props: React.ComponentProps<"table">) => {
  return <MantineTable {...props} />;
};

export const TableTr = (props: React.ComponentProps<"tr">) => {
  return <MantineTableTr {...props} />;
};

export const TableTd = (props: React.ComponentProps<"td">) => {
  return <MantineTableTd {...props} />;
};

export const TableTh = (props: React.ComponentProps<"th">) => {
  return <MantineTableTh {...props} />;
};

export const TableThead = (props: React.ComponentProps<"thead">) => {
  return <MantineTableThead {...props} />;
};

export const TableTbody = (props: React.ComponentProps<"tbody">) => {
  return <MantineTableTbody {...props} />;
};
