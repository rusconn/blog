import { css } from "@emotion/react";

import type { Tag } from "@/generated/graphql";
import { TagLink } from "./TagLink";

const list = css`
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
`;

const listItem = css`
  list-style-type: none;
  margin-right: 0.4rem;
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
`;

type Props = {
  tags: Pick<Tag, "id" | "slug" | "name">[];
};

export const TagList = ({ tags }: Props) => (
  <ul css={list}>
    {tags.map(({ id, slug, name }) => (
      <li key={id} css={listItem}>
        <TagLink slug={slug} name={name} />
      </li>
    ))}
  </ul>
);
