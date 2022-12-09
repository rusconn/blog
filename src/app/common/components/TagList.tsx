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
    <ul className="flex flex-wrap pl-0">
      {fragments.map(({ id, ...tagLink }) => (
        <li className="mr-2 mb-2 list-none text-sm" key={id}>
          <TagLink fragment={tagLink} />
        </li>
      ))}
    </ul>
  );
}
