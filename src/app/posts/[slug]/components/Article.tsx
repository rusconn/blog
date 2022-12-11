import { gql } from "graphql-request";

import { Date, TagsNav, TAGS_NAV_FRAGMENT } from "@/app/common/components";
import type { PostArticleFragment } from "@/generated/graphql";
import { ArticleBody, POST_ARTICLE_BODY_FRAGMENT } from "./ArticleBody";

export const POST_ARTICLE_FRAGMENT = gql`
  fragment PostArticle on Post {
    title
    date
    ...PostArticleBody
    tags {
      ...TagsNav
    }
  }
  ${POST_ARTICLE_BODY_FRAGMENT}
  ${TAGS_NAV_FRAGMENT}
`;

type Props = {
  fragment: PostArticleFragment;
};

export function Article({ fragment: { title, date, tags, ...articleBody } }: Props) {
  return (
    <article>
      <div className="font-medium text-gray-300">
        <Date dateString={date} />
      </div>
      <h2 className="m-0 text-2xl">{title}</h2>
      <div className="mt-2 text-gray-300">
        <TagsNav ariaLabel="記事のタグ" fragments={tags} />
      </div>
      <div className="mt-12 last:[&>*]:mb-0">
        <ArticleBody fragment={articleBody} />
      </div>
    </article>
  );
}
