import { css } from "@emotion/react";

import type { PostQuery } from "@/generated/graphql";
import highlightCodes from "@/libs/html";

import "github-markdown-css";
import "highlight.js/styles/github.css";

const margin = css`
  & > h2 {
    margin: 3rem 0 1rem;
  }
`;

type Props = Pick<QueriedPost["body"], "html">;
type QueriedPost = Exclude<PostQuery["post"], null | undefined>;

export const ArticleBody = ({ html }: Props) => (
  <div
    css={margin}
    className="markdown-body"
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: highlightCodes(html) }}
  />
);
