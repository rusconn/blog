import { gql } from "graphql-request";

import { PostList, POST_LIST_FRAGMENT } from "@/app/common/components";
import type { TagsPostsFieldsFragment } from "@/generated/graphql";

export const TAGS_POSTS_FRAGMENT = gql`
  fragment TagsPostsFields on Tag {
    name
    posts {
      id
      ...PostListFields
    }
  }
  ${POST_LIST_FRAGMENT}
`;

type Props = {
  fragment: TagsPostsFieldsFragment;
};

export const Posts = ({ fragment: { name, posts } }: Props) => (
  <section>
    <h2 className="headingLg">{name} Posts</h2>
    <PostList fragments={posts} />
  </section>
);
