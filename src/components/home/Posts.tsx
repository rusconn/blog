import type { HomeQuery } from "@/generated/graphql";
import { PostList } from "@/components/common";

import * as utilStyles from "@/styles/utils";

type Props = Pick<HomeQuery, "posts">;

export const Posts = ({ posts }: Props) => (
  <section>
    <h2 css={utilStyles.headingLg}>Posts</h2>
    <PostList posts={posts} />
  </section>
);
