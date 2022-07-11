import { gql } from "graphql-request";

import type { TagsPostsFieldsFragment } from "@/generated/graphql";
import { PostList, POST_LIST_FRAGMENT } from "@/components/common";

import * as utilStyles from "@/styles/utils";

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
    <h2 css={utilStyles.headingLg}>{name} Posts</h2>
    <PostList fragments={posts} />
  </section>
);
