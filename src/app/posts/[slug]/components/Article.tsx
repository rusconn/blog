import { gql } from "graphql-request";

import { Date, TagList, TAG_LIST_ITEM_FRAGMENT } from "@/app/common/components";
import type { PostArticleFragment } from "@/generated/graphql";
import { ArticleBody, POST_ARTICLE_BODY_FRAGMENT } from "./ArticleBody";

export const POST_ARTICLE_FRAGMENT = gql`
  fragment PostArticle on Post {
    title
    date
    ...PostArticleBody
    tags {
      ...TagListItem
    }
  }
  ${POST_ARTICLE_BODY_FRAGMENT}
  ${TAG_LIST_ITEM_FRAGMENT}
`;

type Props = {
  fragment: PostArticleFragment;
};

export function Article({ fragment: { title, date, tags, ...articleBody } }: Props) {
  return (
    <article>
      <h1 className="headingXl">{title}</h1>
      <div className="lightText">
        <Date dateString={date} />
      </div>
      <div className="mt-6">
        <TagList fragments={tags} />
      </div>
      <div className="mt-10">
        <ArticleBody fragment={articleBody} />
      </div>
    </article>
  );
}
