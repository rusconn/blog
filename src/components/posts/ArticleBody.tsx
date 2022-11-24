import { gql } from "graphql-request";

import type { ArticleBodyFieldsFragment } from "@/generated/graphql";

import "github-markdown-css";

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
    // eslint-disable-next-line tailwindcss/no-custom-classname
    className="markdown-body [&_h2]:!mt-12 [&_h2]:!mb-4 [&_pre]:!p-[1.2rem]"
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: body }}
  />
);
