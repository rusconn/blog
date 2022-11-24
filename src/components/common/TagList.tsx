import { gql } from "graphql-request";

import type { TagListFieldsFragment } from "@/generated/graphql";
import { TagLink, TAG_LINK_FRAGMENT } from "./TagLink";

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
  <ul className="flex flex-wrap pl-0">
    {fragments.map(({ id, ...rest }) => (
      <li className="mr-[0.4rem] mb-[0.4rem] list-none text-[0.9rem]" key={id}>
        <TagLink fragment={rest} />
      </li>
    ))}
  </ul>
);
