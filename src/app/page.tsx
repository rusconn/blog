import { gql } from "graphql-request";

import { HomeQuery, HomeQueryVariables, PostOrderByInput } from "@/generated/graphql";
import { client } from "@/libs/api";
import { Posts, HOME_POST_FRAGMENT } from "./components";

export const revalidate = 60;

export default async function Home() {
  const { posts } = await getData();

  return <Posts fragments={posts} />;
}

const getData = async () =>
  client.request<HomeQuery, HomeQueryVariables>(
    gql`
      query Home($orderBy: PostOrderByInput!) {
        posts(orderBy: $orderBy) {
          ...HomePost
        }
      }
      ${HOME_POST_FRAGMENT}
    `,
    { orderBy: PostOrderByInput.DateDesc }
  );
