import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { css } from "@emotion/react";

import routes from "@/libs/routes";
import { pagesPath, staticPath } from "@/libs/$path";

import * as utilStyles from "@/styles/utils";

const container = css`
  max-width: 42rem;
  padding: 0 1rem;
  margin: 3rem auto 6rem;
`;

const header = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const backToHome = css`
  margin: 3rem 0 0;
`;

const snsLinks = css`
  text-align: right;
`;

const snsLink = css`
  opacity: 0.4;
  color: black;

  &:not(:first-of-type) {
    margin-left: 0.6rem;
  }

  &:hover {
    opacity: 0.7;
  }
`;

const snsIcon = css`
  width: 1.5rem;
  height: 1.5rem;
`;

const previewHeader = css`
  position: sticky;
  top: 0;
  padding: 1rem;
  text-align: center;
  background-color: lightyellow;
  z-index: 1;
`;

const previewText = css`
  margin: 0;
`;

const previewOff = css`
  text-decoration: underline;
`;

type Props = {
  children: React.ReactNode;
  home?: boolean;
  preview?: boolean;
};

const name = "rusconn";
export const siteTitle = `${name}'s blog`;

const Layout = ({ children, home, preview }: Props) => (
  <>
    {preview && (
      <div css={previewHeader}>
        <p css={previewText}>
          現在プレビュー表示がONになっています。
          <Link href={routes.exitPreview} passHref>
            <a css={previewOff}>プレビュー表示をOFFにする</a>
          </Link>
        </p>
      </div>
    )}
    <div css={container}>
      <Head>
        <link rel="icon" href={staticPath.favicon_ico} />
        <meta name="description" content="web software engineer rusconn's personal blog" />
        <meta name="og:title" content={siteTitle} />
        <meta name="og:site_name" content={siteTitle} />
        <meta name="og:type" content="website" />
      </Head>
      <header css={header}>
        {home ? (
          <>
            <Image
              priority
              src={staticPath.images.profile_png}
              height={144}
              width={144}
              alt={name}
            />
            <h1 css={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href={pagesPath.$url()}>
              <a>
                <Image
                  priority
                  src={staticPath.images.profile_png}
                  height={96}
                  width={96}
                  alt={name}
                />
              </a>
            </Link>
            <h2 css={utilStyles.headingLg}>
              <Link href={pagesPath.$url()} passHref>
                <a css={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div css={backToHome}>
          <Link href={pagesPath.$url()}>
            <a>← Back to home</a>
          </Link>
        </div>
      )}
      <footer>
        <div css={snsLinks}>
          <a
            css={snsLink}
            href="https://twitter.com/rusconn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="rusconnのTwitterへ"
          >
            <FaTwitter css={snsIcon} />
          </a>
          <a
            css={snsLink}
            href="https://github.com/rusconn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="rusconnのGitHubへ"
          >
            <FaGithub css={snsIcon} />
          </a>
        </div>
      </footer>
    </div>
  </>
);

export default Layout;
