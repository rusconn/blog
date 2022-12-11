import { ReactNode } from "react";

import { Layout } from "@/app/common/layout";
import { siteTitle } from "@/constants";
import { staticPath } from "@/libs/$path";

import "@/styles/globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className="h-full" lang="ja">
      <head>
        <link rel="icon" href={staticPath.favicon_ico} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <meta name="description" content="web software engineer rusconn's personal blog" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:site_name" content={siteTitle} />
        <meta property="og:type" content="website" />
      </head>
      <body className="h-full bg-slate-900 text-gray-50">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
