import type { ComponentProps } from "react";

import { PostLink } from "./PostLink";

type Props = {
  posts: ComponentProps<typeof PostLink>[];
};

export function PostList({ posts }: Props) {
  return (
    <ol className="m-0 list-none">
      {posts.map(({ title, date, href }) => (
        <li key={href}>
          <PostLink {...{ title, date, href }} />
        </li>
      ))}
    </ol>
  );
}
