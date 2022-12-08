import { gql } from "graphql-request";
import Link from "next/link";

import type { PostListItemFragment } from "@/generated/graphql";
import { Date } from "./Date";

export const POST_LIST_ITEM_FRAGMENT = gql`
  fragment PostListItem on Post {
    id
    slug
    date
    title
  }
`;

type Props = {
  fragments: PostListItemFragment[];
};

export const PostList = ({ fragments }: Props) => (
  <ul className="m-0 list-none p-0">
    {fragments.map(({ id, slug, date, title }) => (
      <li className="mb-5" key={id}>
        {/* TODO: Next.js が対応したら pathpida のコードへ変更する */}
        {/* https://nextjs.org/docs/messages/app-dir-dynamic-href */}
        <Link href={`/posts/${slug}`}>{title}</Link>
        <br />
        <small className="lightText">
          <Date dateString={date} />
        </small>
      </li>
    ))}
  </ul>
);
