import { gql } from "graphql-request";

import type { PostsNavFragment } from "@/generated/graphql";
import { PostList, POST_LIST_ITEM_FRAGMENT } from "./PostList";

export const POSTS_NAV_FRAGMENT = gql`
  fragment PostsNav on Post {
    ...PostListItem
  }
  ${POST_LIST_ITEM_FRAGMENT}
`;

type Props = {
  heading: string;
  fragments: PostsNavFragment[];
};

export function PostsNav({ heading, fragments }: Props) {
  return (
    <nav aria-labelledby="post-list-navigation">
      <h2 id="post-list-navigation" className="mt-0">
        {heading}
      </h2>
      <PostList fragments={fragments} />
    </nav>
  );
}
