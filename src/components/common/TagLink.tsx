import { gql } from "graphql-request";
import Link from "next/link";

import type { TagLinkFieldsFragment } from "@/generated/graphql";
import { pagesPath } from "@/libs/$path";

export const TAG_LINK_FRAGMENT = gql`
  fragment TagLinkFields on Tag {
    slug
    name
  }
`;

type Props = {
  fragment: TagLinkFieldsFragment;
};

export const TagLink = ({ fragment: { slug, name } }: Props) => (
  <Link href={pagesPath.tags._slug(slug).$url()} className="tagLink">
    {name}
  </Link>
);
