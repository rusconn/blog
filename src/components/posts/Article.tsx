import { gql } from "@apollo/client";
import { css } from "@emotion/react";

import type { PostsArticleFieldsFragment } from "@/generated/graphql";
import { Date, TagList, TAG_LIST_FRAGMENT } from "@/components/common";
import * as utilStyles from "@/styles/utils";
import {
  ArticleBody,
  ARTICLE_BODY_FRAGMENT,
  renderMarkdown,
  Props as ArticleBodyProps,
} from "./ArticleBody";

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

export const POSTS_ARTICLE_FRAGMENT = gql`
  fragment PostsArticleFields on Post {
    title
    date
    ...ArticleBodyFields
    tags {
      id
      ...TagListFields
    }
  }
  ${ARTICLE_BODY_FRAGMENT}
  ${TAG_LIST_FRAGMENT}
`;

export { renderMarkdown };

type Props = ArticleBodyProps & {
  fragment: Omit<PostsArticleFieldsFragment, keyof ArticleBodyProps>;
};

export const Article = ({ fragment: { title, date, tags }, body }: Props) => (
  <article>
    <h1 css={headingXl}>{title}</h1>
    <div css={utilStyles.lightText}>
      <Date dateString={date} />
    </div>
    <div css={tagListMargin}>
      <TagList fragments={tags} />
    </div>
    <div css={markdownMargin}>
      <ArticleBody body={body} />
    </div>
  </article>
);
