import { gql } from "graphql-request";

import type { PostListItemFragment } from "@/generated/graphql";
import { PostLink, POST_LINK_FRAGMENT } from "./PostLink";

export const POST_LIST_ITEM_FRAGMENT = gql`
  fragment PostListItem on Post {
    id
    ...PostLink
  }
  ${POST_LINK_FRAGMENT}
`;

type Props = {
  fragments: PostListItemFragment[];
};

export function PostList({ fragments }: Props) {
  return (
    <ol className="m-0 list-none">
      {fragments.map(({ id, ...postLink }) => (
        <li key={id}>
          <PostLink fragment={postLink} />
        </li>
      ))}
    </ol>
  );
}
