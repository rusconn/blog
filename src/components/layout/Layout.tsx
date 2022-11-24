import Head from "next/head";

import { siteTitle } from "@/constants";
import { staticPath } from "@/libs/$path";
import { BackToHome } from "./BackToHome";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { PreviewInfo } from "./PreviewInfo";

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
      <div className="sticky top-0 z-10 p-4 text-center text-yellow-50">
        <PreviewInfo />
      </div>
    )}
    <div className="mx-auto mt-12 mb-24 max-w-2xl px-4">
      <Header home={home} />
      <main>{children}</main>
      {!home && (
        <div className="mt-16">
          <BackToHome />
        </div>
      )}
      <Footer />
    </div>
  </>
);
