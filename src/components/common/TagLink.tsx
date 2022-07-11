import { gql } from "graphql-request";
import { css } from "@emotion/react";
import Link from "next/link";

import type { TagLinkFieldsFragment } from "@/generated/graphql";
import { pagesPath } from "@/libs/$path";

const link = css`
  display: inline-block;
  padding: 0.4rem;
  border: 1.2px solid transparent;
  border-radius: 0.5rem;
  color: var(--link-color);
  background-color: rgba(var(--link-color-rgb), 0.1);

  &:hover {
    text-decoration: none;
    background-color: rgba(var(--link-color-rgb), 0.9);
    color: #f0f6fc;
  }

  @media (prefers-color-scheme: dark) {
    background-color: rgba(var(--link-color-rgb), 0.2);

    &:hover {
      background-color: rgba(var(--link-color-rgb), 0.7);
    }
  }
`;

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
  <Link href={pagesPath.tags._slug(slug).$url()} passHref prefetch={false}>
    <a css={link}>{name}</a>
  </Link>
);
