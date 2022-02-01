import type { Post } from "@/generated/graphql";
import highlightCodes from "@/libs/html";

import "github-markdown-css";
import "highlight.js/styles/github.css";

type Props = {
  html: Post["body"]["html"];
};

export const ArticleBody = ({ html }: Props) => (
  <div
    className="markdown-body"
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: highlightCodes(html) }}
  />
);
