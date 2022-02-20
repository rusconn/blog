import { gql } from "@apollo/client";
import { css } from "@emotion/react";

import type { ArticleBodyFieldsFragment } from "@/generated/graphql";

import "github-markdown-css";

const style = css`
  & > h2 {
    margin: 3rem 0 1rem;
  }

  & pre {
    padding: 1.2rem;
  }
`;

export const ARTICLE_BODY_FRAGMENT = gql`
  fragment ArticleBodyFields on Post {
    body
  }
`;

export const renderMarkdown = async ({ body }: ArticleBodyFieldsFragment) => {
  const response = await fetch("https://api.github.com/markdown", {
    method: "POST",
    headers: { accept: "application/vnd.github.v3+json" },
    body: JSON.stringify({ text: body }),
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const renderedBody = await response.text();

  return { body: renderedBody as SafeHtml };
};

type SafeHtml = string & { __brand: "SafeHtml" };

export type Props = Awaited<ReturnType<typeof renderMarkdown>>;

export const ArticleBody = ({ body }: Props) => (
  <div
    css={style}
    className="markdown-body"
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: body }}
  />
);
