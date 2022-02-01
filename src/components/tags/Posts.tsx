import type { Tag } from "@/generated/graphql";
import { PostList } from "@/components/common";

import * as utilStyles from "@/styles/utils";

type Props = {
  tag: Pick<Tag, "name"> & TagPosts;
};

type TagPosts = {
  posts: Pick<Tag["posts"][number], "id" | "slug" | "date" | "title">[];
};

export const Posts = ({ tag }: Props) => (
  <section>
    <h2 css={utilStyles.headingLg}>{tag.name} Posts</h2>
    <PostList posts={tag.posts} css={utilStyles.list} itemCss={utilStyles.listItem} />
  </section>
);
