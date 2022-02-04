import { css } from "@emotion/react";
import Link from "next/link";

import type { Tag } from "@/generated/graphql";
import { pagesPath } from "@/libs/$path";

const link = css`
  display: inline-block;
  padding: 0.4rem;
  border: 1.2px solid var(--link-color);
  border-radius: 0.4rem;
`;

type Props = Pick<Tag, "slug" | "name">;

export const TagLink = ({ slug, name }: Props) => (
  <Link href={pagesPath.tags._slug(slug).$url()} passHref prefetch={false}>
    <a css={link}>{name}</a>
  </Link>
);