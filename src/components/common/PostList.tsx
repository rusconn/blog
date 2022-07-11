import { gql } from "graphql-request";
import { css } from "@emotion/react";
import Link from "next/link";

import type { PostListFieldsFragment } from "@/generated/graphql";
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

export const POST_LIST_FRAGMENT = gql`
  fragment PostListFields on Post {
    id
    slug
    date
    title
  }
`;

type Props = {
  fragments: PostListFieldsFragment[];
};

export const PostList = ({ fragments }: Props) => (
  <ul css={list}>
    {fragments.map(({ id, slug, date, title }) => (
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
