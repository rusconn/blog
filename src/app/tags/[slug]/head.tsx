import { gql } from "graphql-request";

import { TagHeadQuery, TagHeadQueryVariables } from "@/generated/graphql";
import { getClient } from "@/libs/api";

type Params = {
  params: {
    slug: string;
  };
};

const Head = async ({ params }: Params) => {
  const { tag } = await getData(params.slug);

  return (
    <>
      <title>{tag?.name}</title>
    </>
  );
};

const getData = async (slug: string) =>
  getClient().request<TagHeadQuery, TagHeadQueryVariables>(
    gql`
      query TagHead($where: TagWhereUniqueInput!) {
        tag(where: $where) {
          name
        }
      }
    `,
    { where: { slug } }
  );

export default Head;
