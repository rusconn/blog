import { gql } from "@apollo/client";
import { css } from "@emotion/react";

import type { TagListFieldsFragment } from "@/generated/graphql";
import { TagLink, TAG_LINK_FRAGMENT } from "./TagLink";

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

export const TAG_LIST_FRAGMENT = gql`
  fragment TagListFields on Tag {
    id
    ...TagLinkFields
  }
  ${TAG_LINK_FRAGMENT}
`;

type Props = {
  fragments: TagListFieldsFragment[];
};

export const TagList = ({ fragments }: Props) => (
  <ul css={list}>
    {fragments.map(({ id, ...rest }) => (
      <li key={id} css={listItem}>
        <TagLink fragment={rest} />
      </li>
    ))}
  </ul>
);
