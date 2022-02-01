import type { Post } from "@/generated/graphql";
import { PostList } from "@/components/common";

import * as utilStyles from "@/styles/utils";

type Props = {
  posts: Pick<Post, "id" | "slug" | "date" | "title">[];
};

export const Posts = ({ posts }: Props) => (
  <section>
    <h2 css={utilStyles.headingLg}>Posts</h2>
    <PostList posts={posts} css={utilStyles.list} itemCss={utilStyles.listItem} />
  </section>
);
