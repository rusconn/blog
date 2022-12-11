import { gql } from "graphql-request";

import { PostsNav, POSTS_NAV_FRAGMENT } from "@/app/common/components";
import { HomeQuery, HomeQueryVariables, PostOrderByInput } from "@/generated/graphql";
import { client } from "@/libs/api";

export const revalidate = 60;

export default async function Home() {
  const { posts } = await getData();

  return <PostsNav heading="すべての記事" fragments={posts} />;
}

const getData = async () =>
  client.request<HomeQuery, HomeQueryVariables>(
    gql`
      query Home($orderBy: PostOrderByInput!) {
        posts(orderBy: $orderBy) {
          ...PostsNav
        }
      }
      ${POSTS_NAV_FRAGMENT}
    `,
    { orderBy: PostOrderByInput.DateDesc }
  );
