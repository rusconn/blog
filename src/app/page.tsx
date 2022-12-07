import { gql } from "graphql-request";

import { Layout } from "@/app/common/layout";
import { HomeQuery, HomeQueryVariables } from "@/generated/graphql";
import { client, previewClient } from "@/libs/api";
import { isPreview } from "@/libs/preview";
import { Biography, Posts, Tags, HOME_TAGS_FRAGMENT, HOME_POSTS_FRAGMENT } from "./components";

const Home = async () => {
  const preview = isPreview();
  const { tags, posts } = await getData(preview);

  return (
    <Layout home preview={preview}>
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
};

const getData = async (preview: boolean) => {
  const clientToUse = preview ? previewClient : client;

  return clientToUse.request<HomeQuery, HomeQueryVariables>(gql`
    query Home {
      tags {
        id
        ...HomeTagsFields
      }
      posts(orderBy: date_DESC) {
        id
        ...HomePostsFields
      }
    }
    ${HOME_TAGS_FRAGMENT}
    ${HOME_POSTS_FRAGMENT}
  `);
};

export const revalidate = 60;

export default Home;
