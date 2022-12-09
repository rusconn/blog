import { gql } from "graphql-request";
import { notFound } from "next/navigation";

import {
  TagQuery,
  TagQueryVariables,
  TagPathsQuery,
  TagPathsQueryVariables,
} from "@/generated/graphql";
import { client, getClient } from "@/libs/api";
import { Posts, TAG_POSTS_FRAGMENT } from "./components";

export const revalidate = 60;

type Params = {
  params: {
    slug: string;
  };
};

export default async function Tag({ params }: Params) {
  const { tag } = await getData(params.slug);

  if (!tag) {
    notFound();
  }

  return (
    <div className="headingMd">
      <Posts fragment={tag} />
    </div>
  );
}

const getData = async (slug: string) =>
  getClient().request<TagQuery, TagQueryVariables>(
    gql`
      query Tag($where: TagWhereUniqueInput!) {
        tag(where: $where) {
          ...TagPosts
        }
      }
      ${TAG_POSTS_FRAGMENT}
    `,
    { where: { slug } }
  );

export const generateStaticParams = async () => {
  const data = await client.request<TagPathsQuery, TagPathsQueryVariables>(gql`
    query TagPaths {
      tags {
        slug
        posts {
          id
        }
      }
    }
  `);

  return data.tags.filter(({ posts }) => posts.length).map(({ slug }) => ({ slug }));
};
