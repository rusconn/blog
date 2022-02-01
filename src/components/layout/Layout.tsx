import { css } from "@emotion/react";
import Head from "next/head";

import { siteTitle } from "@/constants";
import { staticPath } from "@/libs/$path";
import { BackToHome } from "./BackToHome";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { PreviewInfo } from "./PreviewInfo";

const previewInfo = css`
  position: sticky;
  top: 0;
  padding: 1rem;
  text-align: center;
  background-color: lightyellow;
  z-index: 1;
`;

const container = css`
  max-width: 42rem;
  padding: 0 1rem;
  margin: 3rem auto 6rem;
`;

const backToHome = css`
  margin: 3rem 0 0;
`;

type Props = {
  children: React.ReactNode;
  home?: boolean;
  preview?: boolean;
};

export const Layout = ({ children, home, preview }: Props) => (
  <>
    <Head>
      <link rel="icon" href={staticPath.favicon_ico} />
      <meta name="description" content="web software engineer rusconn's personal blog" />
      <meta name="og:title" content={siteTitle} />
      <meta name="og:site_name" content={siteTitle} />
      <meta name="og:type" content="website" />
    </Head>
    {preview && (
      <div css={previewInfo}>
        <PreviewInfo />
      </div>
    )}
    <div css={container}>
      <Header home={home} />
      <main>{children}</main>
      {!home && (
        <div css={backToHome}>
          <BackToHome />
        </div>
      )}
      <Footer />
    </div>
  </>
);
