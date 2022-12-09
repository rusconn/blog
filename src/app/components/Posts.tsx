import { gql } from "graphql-request";

import { PostList, POST_LIST_ITEM_FRAGMENT } from "@/app/common/components";
import type { HomePostFragment } from "@/generated/graphql";

export const HOME_POST_FRAGMENT = gql`
  fragment HomePost on Post {
    ...PostListItem
  }
  ${POST_LIST_ITEM_FRAGMENT}
`;

type Props = {
  fragments: HomePostFragment[];
};

export function Posts({ fragments }: Props) {
  return (
    <section>
      <h2 className="headingLg">Posts</h2>
      <PostList fragments={fragments} />
    </section>
  );
}
