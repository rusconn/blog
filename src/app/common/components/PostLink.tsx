import { gql } from "graphql-request";
import Link from "next/link";

import type { PostLinkFragment } from "@/generated/graphql";
import { Date } from "./Date";

export const POST_LINK_FRAGMENT = gql`
  fragment PostLink on Post {
    slug
    date
    title
  }
`;

type Props = {
  fragment: PostLinkFragment;
};

export function PostLink({ fragment: { slug, date, title } }: Props) {
  return (
    <Link
      className="-ml-2 block rounded-lg p-2 text-gray-50 hover:bg-slate-800 hover:no-underline"
      // TODO: Next.js が対応したら pathpida のコードへ変更する
      // https://nextjs.org/docs/messages/app-dir-dynamic-href
      href={`/posts/${slug}`}
    >
      <div className="text-sm font-medium text-gray-300">
        <Date dateString={date} />
      </div>
      <h3 className="m-0">{title}</h3>
    </Link>
  );
}
