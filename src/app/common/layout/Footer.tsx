import { gql } from "graphql-request";
import { use } from "react";

import { TagsNav, TAGS_NAV_FRAGMENT } from "@/app/common/components";
import { authorName } from "@/constants";
import type { FooterQuery, FooterQueryVariables } from "@/generated/graphql";
import { client } from "@/libs/api";

export function Footer() {
  const { tags } = use(getData());
  const year = new Date().getFullYear();

  return (
    <footer className="flex justify-center border-t border-gray-600 bg-slate-800 py-12">
      <div className="w-full max-w-3xl px-6">
        <TagsNav ariaLabel="すべてのタグ" fragments={tags} />
        <div className="mt-6 text-right">
          <small className="text-sm text-gray-300">
            &copy; {year} {authorName}
          </small>
        </div>
      </div>
    </footer>
  );
}

const getData = async () =>
  client.request<FooterQuery, FooterQueryVariables>(
    gql`
      query Footer {
        tags {
          ...TagsNav
        }
      }
      ${TAGS_NAV_FRAGMENT}
    `
  );
