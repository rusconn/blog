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
      <div className="space-y-2">
        <div className="font-medium text-gray-300">
          <Date dateString={date} />
        </div>
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="text-gray-300">
          <TagList fragments={tags} />
        </div>
      </div>
      <ArticleBody fragment={articleBody} />
    </article>
  );
}
