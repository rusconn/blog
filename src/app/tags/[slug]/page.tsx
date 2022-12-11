import { gql } from "graphql-request";
import { notFound } from "next/navigation";

import { PostsNav, POSTS_NAV_FRAGMENT } from "@/app/common/components";
import {
  TagQuery,
  TagQueryVariables,
  TagPathsQuery,
  TagPathsQueryVariables,
  PostOrderByInput,
} from "@/generated/graphql";
import { client, buildClient } from "@/libs/api";

export const revalidate = 60;

export const generateStaticParams = async () => {
  const data = await buildClient.request<TagPathsQuery, TagPathsQueryVariables>(gql`
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

type Params = {
  params: Awaited<ReturnType<typeof generateStaticParams>>[number];
};

export default async function Tag({ params }: Params) {
  const { tag } = await getData(params.slug);

  if (!tag) {
    notFound();
  }

  return <PostsNav heading={`${tag.name}の記事`} fragments={tag.posts} />;
}

const getData = async (slug: string) =>
  client.request<TagQuery, TagQueryVariables>(
    gql`
      query Tag($where: TagWhereUniqueInput!, $orderBy: PostOrderByInput!) {
        tag(where: $where) {
          name
          posts(orderBy: $orderBy) {
            ...PostsNav
          }
        }
      }
      ${POSTS_NAV_FRAGMENT}
    `,
    { where: { slug }, orderBy: PostOrderByInput.DateDesc }
  );
