import { gql } from "graphql-request";

import { TagHeadQuery, TagHeadQueryVariables } from "@/generated/graphql";
import { client } from "@/libs/api";

type Params = {
  params: {
    slug: string;
  };
};

export default async function Head({ params }: Params) {
  const { tag } = await getData(params.slug);

  return <title>{tag?.name}</title>;
}

const getData = async (slug: string) =>
  client.request<TagHeadQuery, TagHeadQueryVariables>(
    gql`
      query TagHead($where: TagWhereUniqueInput!) {
        tag(where: $where) {
          name
        }
      }
    `,
    { where: { slug } }
  );
