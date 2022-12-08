import { gql } from "graphql-request";

import { TagList, TAG_LIST_ITEM_FRAGMENT } from "@/app/common/components";
import type { HomeTagFragment } from "@/generated/graphql";

export const HOME_TAG_FRAGMENT = gql`
  fragment HomeTag on Tag {
    ...TagListItem
  }
  ${TAG_LIST_ITEM_FRAGMENT}
`;

type Props = {
  fragments: HomeTagFragment[];
};

export const Tags = ({ fragments }: Props) => (
  <section>
    <TagList fragments={fragments} />
  </section>
);
