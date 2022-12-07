import { gql } from "graphql-request";

import { PostList, POST_LIST_FRAGMENT } from "@/app/common/components";
import type { HomePostsFieldsFragment } from "@/generated/graphql";

export const HOME_POSTS_FRAGMENT = gql`
  fragment HomePostsFields on Post {
    ...PostListFields
  }
  ${POST_LIST_FRAGMENT}
`;

type Props = {
  fragments: HomePostsFieldsFragment[];
};

export const Posts = ({ fragments }: Props) => (
  <section>
    <h2 className="headingLg">Posts</h2>
    <PostList fragments={fragments} />
  </section>
);
