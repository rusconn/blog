import { css } from "@emotion/react";
import Link from "next/link";

import { Tag } from "@/generated/graphql";
import { pagesPath } from "@/libs/$path";

export const tagLink = css`
  display: inline-block;
  padding: 0.4rem;
`;

type Props = Pick<Tag, "slug" | "name">;

export const TagLink = ({ slug, name }: Props) => (
  <Link href={pagesPath.tags._slug(slug).$url()} passHref prefetch={false}>
    <a css={tagLink}>{name}</a>
  </Link>
);
