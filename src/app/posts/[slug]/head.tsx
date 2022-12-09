import { gql } from "graphql-request";

import { PostHeadQuery, PostHeadQueryVariables } from "@/generated/graphql";
import { client } from "@/libs/api";

type Params = {
  params: {
    slug: string;
  };
};

export default async function Head({ params }: Params) {
  const { post } = await getData(params.slug);

  return <title>{post?.title}</title>;
}

const getData = async (slug: string) =>
  client.request<PostHeadQuery, PostHeadQueryVariables>(
    gql`
      query PostHead($where: PostWhereUniqueInput!) {
        post(where: $where) {
          title
        }
      }
    `,
    { where: { slug } }
  );
