import type { AppProps } from "next/app";
import { Global, css } from "@emotion/react";

const globalStyles = css`
  :root {
    --background-color: white;
    --link-color: #0969da;
    --color: black;
    --light-color: #666;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --background-color: #0d1117;
      --link-color: #58a6ff;
      --color: #c9d1d9;
      --light-color: #8b949e;
    }
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
      Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    background-color: var(--background-color);
    color: var(--color);
  }

  a {
    color: var(--link-color);
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Global styles={globalStyles} />
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </>
);

export default MyApp;
