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
    <Link href={`/tags/${slug}`} className="tagLink">
      {name}
    </Link>
  );
}
