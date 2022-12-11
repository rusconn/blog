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

export function PostList({ fragments }: Props) {
  return (
    <ul className="m-0 list-none space-y-2 p-0">
      {fragments.map(({ id, slug, date, title }) => (
        <li key={id}>
          <Link
            className="-ml-2 block rounded-lg p-2 hover:bg-slate-800"
            // TODO: Next.js が対応したら pathpida のコードへ変更する
            // https://nextjs.org/docs/messages/app-dir-dynamic-href
            href={`/posts/${slug}`}
          >
            <div className="text-sm font-medium text-gray-300">
              <Date dateString={date} />
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}
