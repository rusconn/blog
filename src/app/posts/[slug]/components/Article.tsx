import { gql } from "graphql-request";

import { Date, TagList, TAG_LIST_FRAGMENT } from "@/app/common/components";
import type { PostsArticleFieldsFragment } from "@/generated/graphql";
import {
  ArticleBody,
  ARTICLE_BODY_FRAGMENT,
  renderMarkdown,
  Props as ArticleBodyProps,
} from "./ArticleBody";

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
    <h1 className="headingXl">{title}</h1>
    <div className="lightText">
      <Date dateString={date} />
    </div>
    <div className="mt-6">
      <TagList fragments={tags} />
    </div>
    <div className="mt-10">
      <ArticleBody body={body} />
    </div>
  </article>
);
