import { ReactNode } from "react";

import { siteTitle } from "@/constants";
import { staticPath } from "@/libs/$path";

import "@/styles/globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href={staticPath.favicon_ico} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <meta name="description" content="web software engineer rusconn's personal blog" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:site_name" content={siteTitle} />
        <meta property="og:type" content="website" />
      </head>
      <body>{children}</body>
    </html>
  );
}
