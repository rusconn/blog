import { css } from "@emotion/react";

import type { Post } from "@/generated/graphql";
import { Date, TagList } from "@/components/common";
import * as utilStyles from "@/styles/utils";
import { ArticleBody } from "./ArticleBody";

import "github-markdown-css";
import "highlight.js/styles/github.css";

const tagListMargin = css`
  margin-top: 1.4rem;
`;

const markdownMargin = css`
  margin-top: 3.2rem;
`;

type Props = {
  post: Pick<Post, "title" | "date">;
  html: Post["body"]["html"];
  tags: Pick<Post["tags"][number], "id" | "slug" | "name">[];
};

export const Article = ({ post, html, tags }: Props) => (
  <article>
    <h1 css={utilStyles.headingXl}>{post.title}</h1>
    <div css={utilStyles.lightText}>
      <Date dateString={post.date} />
    </div>
    <div css={tagListMargin}>
      <TagList css={utilStyles.tagsList} tags={tags} itemCss={utilStyles.tagsListItem} />
    </div>
    <div css={markdownMargin}>
      <ArticleBody html={html} />
    </div>
  </article>
);
