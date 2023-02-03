import type { ComponentProps } from "react";

import { PostList } from "./PostList";

type Props = {
  heading: string;
  posts: ComponentProps<typeof PostList>["posts"];
};

export function PostsNav({ heading, posts }: Props) {
  return (
    <nav aria-labelledby="post-list-navigation">
      <h2 id="post-list-navigation" className="mt-0 mb-6 text-xl font-semibold">
        {heading}
      </h2>
      <PostList {...{ posts }} />
    </nav>
  );
}
