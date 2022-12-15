import { ReactNode } from "react";

import { Layout } from "@/app/common/layout";
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
        <meta property="og:site_name" content={siteTitle} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://blog-rusconn.vercel.app/images/og.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@rusconn" />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
