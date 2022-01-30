import type { AppProps } from "next/app";
import { Global, css } from "@emotion/react";

const globalStyles = css`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
      Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: royalblue;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  @media (prefers-color-scheme: dark) {
    body {
      background-color: #0d1117;
      color: #c9d1d9;
    }
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
