import Document, { DocumentContext, Html, Head, Main, NextScript } from "next/document";

import { siteTitle } from "@/constants";
import { staticPath } from "@/libs/$path";

const MyDocument = class extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang="ja">
        <Head>
          <link rel="icon" href={staticPath.favicon_ico} />
          <meta name="description" content="web software engineer rusconn's personal blog" />
          <meta property="og:title" content={siteTitle} />
          <meta property="og:site_name" content={siteTitle} />
          <meta property="og:type" content="website" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
};

export default MyDocument;
