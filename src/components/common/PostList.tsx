import { gql } from "graphql-request";
import Link from "next/link";

import type { PostListFieldsFragment } from "@/generated/graphql";
import { pagesPath } from "@/libs/$path";
import { Date } from "./Date";

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
  <ul className="m-0 list-none p-0">
    {fragments.map(({ id, slug, date, title }) => (
      <li className="mb-5" key={id}>
        <Link href={pagesPath.posts._slug(slug).$url()}>
          <a>{title}</a>
        </Link>
        <br />
        <small className="lightText">
          <Date dateString={date} />
        </small>
      </li>
    ))}
  </ul>
);
