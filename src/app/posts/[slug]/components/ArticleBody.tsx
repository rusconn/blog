import { gql } from "graphql-request";
import { use } from "react";

import type { ArticleBodyFieldsFragment } from "@/generated/graphql";

import "./github-markdown.css";

export const ARTICLE_BODY_FRAGMENT = gql`
  fragment ArticleBodyFields on Post {
    body
  }
`;

const renderMarkdown = async (markdown: string) => {
  const response = await fetch("https://api.github.com/markdown", {
    method: "POST",
    headers: { accept: "application/vnd.github.v3+json" },
    body: JSON.stringify({ text: markdown }),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text);
  }

  return text;
};

export type Props = ArticleBodyFieldsFragment;

export const ArticleBody = ({ body }: Props) => {
  const renderedBody = use(renderMarkdown(body));

  return (
    <div
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className="markdown-body [&_h2]:!mt-12 [&_h2]:!mb-4 [&_pre]:!p-[1.2rem]"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: renderedBody }}
    />
  );
};