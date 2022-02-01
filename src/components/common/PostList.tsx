import { css } from "@emotion/react";
import Link from "next/link";

import type { Post } from "@/generated/graphql";
import { pagesPath } from "@/libs/$path";
import * as utilStyles from "@/styles/utils";
import { Date } from "./Date";

const list = css`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const listItem = css`
  margin: 0 0 1.25rem;
`;

type Props = {
  posts: Pick<Post, "id" | "slug" | "date" | "title">[];
};

export const PostList = ({ posts }: Props) => (
  <ul css={list}>
    {posts.map(({ id, slug, date, title }) => (
      <li css={listItem} key={id}>
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
