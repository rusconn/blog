import { gql } from "graphql-request";

import type { TagListItemFragment } from "@/generated/graphql";
import { TagLink, TAG_LINK_FRAGMENT } from "./TagLink";

export const TAG_LIST_ITEM_FRAGMENT = gql`
  fragment TagListItem on Tag {
    id
    ...TagLink
  }
  ${TAG_LINK_FRAGMENT}
`;

type Props = {
  fragments: TagListItemFragment[];
};

export function TagList({ fragments }: Props) {
  return (
    <ul className="m-0 flex list-none flex-wrap gap-1">
      {fragments.map(({ id, ...tagLink }) => (
        <li className="text-xs font-medium" key={id}>
          <TagLink fragment={tagLink} />
        </li>
      ))}
    </ul>
  );
}
