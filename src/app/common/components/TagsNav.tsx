import { gql } from "graphql-request";

import type { TagsNavFragment } from "@/generated/graphql";
import { TagList, TAG_LIST_ITEM_FRAGMENT } from "./TagList";

export const TAGS_NAV_FRAGMENT = gql`
  fragment TagsNav on Tag {
    ...TagListItem
  }
  ${TAG_LIST_ITEM_FRAGMENT}
`;

type Props = {
  ariaLabel: string;
  fragments: TagsNavFragment[];
};

export function TagsNav({ ariaLabel, fragments }: Props) {
  return (
    <nav aria-label={ariaLabel}>
      <TagList fragments={fragments} />
    </nav>
  );
}
