import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

import routes from "../libs/routes";

import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";

type Props = {
  children: React.ReactNode;
  home?: boolean;
};

const name = "rusconn";
export const siteTitle = `${name}'s blog`;

const Layout = ({ children, home }: Props) => (
  <div className={styles.container}>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content="web software engineer rusconn's personal blog" />
      <meta name="og:title" content={siteTitle} />
      <meta name="og:site_name" content={siteTitle} />
      <meta name="og:type" content="website" />
    </Head>
    <header className={styles.header}>
      {home ? (
        <>
          <Image priority src="/images/profile.png" height={144} width={144} alt={name} />
          <h1 className={utilStyles.heading2Xl}>{name}</h1>
        </>
      ) : (
        <>
          <Link href={routes.top}>
            <a>
              <Image priority src="/images/profile.png" height={96} width={96} alt={name} />
            </a>
          </Link>
          <h2 className={utilStyles.headingLg}>
            <Link href={routes.top}>
              <a className={utilStyles.colorInherit}>{name}</a>
            </Link>
          </h2>
        </>
      )}
    </header>
    <main>{children}</main>
    {!home && (
      <div className={styles.backToHome}>
        <Link href={routes.top}>
          <a>← Back to home</a>
        </Link>
      </div>
    )}
    <footer>
      <div className={styles.snsLinks}>
        <a
          className={styles.snsLink}
          href="https://github.com/rusconn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="rusconnのGitHubへ"
        >
          <FaGithub className={styles.snsIcon} />
        </a>
      </div>
    </footer>
  </div>
);

export default Layout;
