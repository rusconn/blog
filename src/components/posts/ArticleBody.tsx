import { css } from "@emotion/react";

import "github-markdown-css";

const style = css`
  & > h2 {
    margin: 3rem 0 1rem;
  }

  & pre {
    padding: 1.2rem;
  }
`;

export type Props = { safeHtml: string };

export const ArticleBody = ({ safeHtml }: Props) => (
  <div
    css={style}
    className="markdown-body"
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: safeHtml }}
  />
);
