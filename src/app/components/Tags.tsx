import { gql } from "graphql-request";

import { TagList, TAG_LIST_FRAGMENT } from "@/app/common/components";
import type { HomeTagsFieldsFragment } from "@/generated/graphql";

export const HOME_TAGS_FRAGMENT = gql`
  fragment HomeTagsFields on Tag {
    ...TagListFields
  }
  ${TAG_LIST_FRAGMENT}
`;

type Props = {
  fragments: HomeTagsFieldsFragment[];
};

export const Tags = ({ fragments }: Props) => (
  <section>
    <TagList fragments={fragments} />
  </section>
);
