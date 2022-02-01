import { css } from "@emotion/react";

import type { PostQuery } from "@/generated/graphql";
import { Date, TagList } from "@/components/common";
import * as utilStyles from "@/styles/utils";
import { ArticleBody } from "./ArticleBody";

const headingXl = css`
  font-size: 2rem;
  line-height: 1.3;
  font-weight: 800;
  letter-spacing: -0.05rem;
  margin: 1rem 0;
`;

const tagListMargin = css`
  margin-top: 1.4rem;
`;

const markdownMargin = css`
  margin-top: 3.2rem;
`;

type Props = {
  post: Exclude<PostQuery["post"], null | undefined>;
};

export const Article = ({ post: { title, date, tags, body } }: Props) => (
  <article>
    <h1 css={headingXl}>{title}</h1>
    <div css={utilStyles.lightText}>
      <Date dateString={date} />
    </div>
    <div css={tagListMargin}>
      <TagList tags={tags} />
    </div>
    <div css={markdownMargin}>
      <ArticleBody html={body.html} />
    </div>
  </article>
);
