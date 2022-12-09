import { gql } from "graphql-request";

import { PostList, POST_LIST_ITEM_FRAGMENT } from "@/app/common/components";
import type { TagPostsFragment } from "@/generated/graphql";

export const TAG_POSTS_FRAGMENT = gql`
  fragment TagPosts on Tag {
    name
    posts {
      ...PostListItem
    }
  }
  ${POST_LIST_ITEM_FRAGMENT}
`;

type Props = {
  fragment: TagPostsFragment;
};

export function Posts({ fragment: { name, posts } }: Props) {
  return (
    <section>
      <h2 className="headingLg">{name} Posts</h2>
      <PostList fragments={posts} />
    </section>
  );
}
