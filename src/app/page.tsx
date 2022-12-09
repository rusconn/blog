import { gql } from "graphql-request";

import { Layout } from "@/app/common/layout";
import { HomeQuery, HomeQueryVariables, PostOrderByInput } from "@/generated/graphql";
import { getClient } from "@/libs/api";
import { Biography, Posts, Tags, HOME_TAG_FRAGMENT, HOME_POST_FRAGMENT } from "./components";

export default async function Home() {
  const { tags, posts } = await getData();

  return (
    <Layout home>
      <div className="headingMd my-4">
        <Biography />
      </div>
      <div className="headingMd mt-6 mb-4">
        <Tags fragments={tags} />
      </div>
      <div className="headingMd">
        <Posts fragments={posts} />
      </div>
    </Layout>
  );
}

const getData = async () =>
  getClient().request<HomeQuery, HomeQueryVariables>(
    gql`
      query Home($orderBy: PostOrderByInput!) {
        tags {
          ...HomeTag
        }
        posts(orderBy: $orderBy) {
          ...HomePost
        }
      }
      ${HOME_TAG_FRAGMENT}
      ${HOME_POST_FRAGMENT}
    `,
    { orderBy: PostOrderByInput.DateDesc }
  );

export const revalidate = 60;
