import { gql } from "graphql-request";
import { use } from "react";

import { TagList, TAG_LIST_ITEM_FRAGMENT } from "@/app/common/components";
import type { FooterQuery, FooterQueryVariables } from "@/generated/graphql";
import { client } from "@/libs/api";

export function Footer() {
  const { tags } = use(getData());
  const year = new Date().getFullYear();

  return (
    <footer>
      <TagList fragments={tags} />
      <div className="mt-4 text-right">
        <small className="text-sm text-gray-300">&copy; {year} rusconn</small>
      </div>
    </footer>
  );
}

const getData = async () =>
  client.request<FooterQuery, FooterQueryVariables>(
    gql`
      query Footer {
        tags {
          ...TagListItem
        }
      }
      ${TAG_LIST_ITEM_FRAGMENT}
    `
  );
