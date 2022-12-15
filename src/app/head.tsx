import { siteTitle } from "@/constants";

export default function Head() {
  return (
    <>
      <title>{siteTitle}</title>
      <meta property="og:title" content={siteTitle} key="og-title" />
      <meta property="og:url" content="https://blog-rusconn.vercel.app" key="og-url" />
      <meta property="og:description" content="Blog posts by @rusconn" key="og-description" />
    </>
  );
}
