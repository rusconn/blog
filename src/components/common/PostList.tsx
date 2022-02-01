import { SerializedStyles } from "@emotion/react";
import Link from "next/link";

import type { Post } from "@/generated/graphql";
import { pagesPath } from "@/libs/$path";
import * as utilStyles from "@/styles/utils";
import { Date } from "./Date";

type Props = {
  posts: Pick<Post, "id" | "slug" | "date" | "title">[];
  className?: string;
  itemCss?: SerializedStyles;
};

export const PostList = ({ posts, className, itemCss }: Props) => (
  <ul className={className}>
    {posts.map(({ id, slug, date, title }) => (
      <li css={itemCss} key={id}>
        <Link href={pagesPath.posts._slug(slug).$url()} prefetch={false}>
          <a>{title}</a>
        </Link>
        <br />
        <small css={utilStyles.lightText}>
          <Date dateString={date} />
        </small>
      </li>
    ))}
  </ul>
);
