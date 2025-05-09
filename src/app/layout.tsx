import type { Metadata } from "next";

import { MantineProvider } from "@mantine/core";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { SessionProvider } from "next-auth/react";

import "@mantine/code-highlight/styles.css";
import "@mantine/core/styles.css";
import AppShell from "./_components/AppShell";
import ChannelsAccordionProvider from "./_components/ChannelsAccordionProvider";
import "./globals.css";

dayjs.extend(utc);
dayjs.extend(timezone);

export const metadata: Metadata = {
  title: "Digichat",
  description: "Generated by create next app",
};

type RootRayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootRayoutProps) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css"
          integrity="sha384-zh0CIslj+VczCZtlzBcjt5ppRcsAmDnRem7ESsYwWwg3m/OaJ2l4x7YBZl9Kxxib"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <SessionProvider>
          <MantineProvider>
            <ChannelsAccordionProvider>
              <AppShell>{children}</AppShell>
            </ChannelsAccordionProvider>
          </MantineProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
