import type { TagQuery } from "@/generated/graphql";
import { PostList } from "@/components/common";

import * as utilStyles from "@/styles/utils";

type Props = {
  tag: Exclude<TagQuery["tag"], null | undefined>;
};

export const Posts = ({ tag: { name, posts } }: Props) => (
  <section>
    <h2 css={utilStyles.headingLg}>{name} Posts</h2>
    <PostList posts={posts} />
  </section>
);
