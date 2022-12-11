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

export function TagLink({ fragment: { slug, name } }: Props) {
  return (
    <Link
      href={`/tags/${slug}`}
      className="inline-block rounded-md border border-slate-600 bg-slate-900 py-1.5 px-2 text-gray-300 hover:border-sky-400 hover:text-sky-400 hover:no-underline"
    >
      {name}
    </Link>
  );
}
