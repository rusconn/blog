import { gql } from "graphql-request";
import Link from "next/link";

import type { TagLinkFragment } from "@/generated/graphql";

export const TAG_LINK_FRAGMENT = gql`
  fragment TagLink on Tag {
    slug
    name
  }
`;

type Props = {
  fragment: TagLinkFragment;
};

export const TagLink = ({ fragment: { slug, name } }: Props) => (
  // TODO: Next.js が対応したら pathpida のコードへ変更する
  // https://nextjs.org/docs/messages/app-dir-dynamic-href
  <Link href={`/tags/${slug}`} className="tagLink">
    {name}
  </Link>
);
