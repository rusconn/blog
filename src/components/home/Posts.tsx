import { gql } from "graphql-request";

import type { HomePostsFieldsFragment } from "@/generated/graphql";
import { PostList, POST_LIST_FRAGMENT } from "@/components/common";

import * as utilStyles from "@/styles/utils";

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
    <h2 css={utilStyles.headingLg}>Posts</h2>
    <PostList fragments={fragments} />
  </section>
);
