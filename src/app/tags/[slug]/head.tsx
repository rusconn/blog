import { gql } from "graphql-request";

import { TagHeadQuery, TagHeadQueryVariables } from "@/generated/graphql";
import { previewClient, client } from "@/libs/api";
import { isPreview } from "@/libs/preview";

type Params = {
  params: {
    slug: string;
  };
};

const Head = async ({ params }: Params) => {
  const preview = isPreview();
  const { tag } = await getData(preview, params.slug);

  return (
    <>
      <title>{tag?.name}</title>
    </>
  );
};

const getData = async (preview: boolean, slug: string) => {
  const clientToUse = preview ? previewClient : client;

  return clientToUse.request<TagHeadQuery, TagHeadQueryVariables>(
    gql`
      query TagHead($where: TagWhereUniqueInput!) {
        tag(where: $where) {
          name
        }
      }
    `,
    { where: { slug } }
  );
};

export default Head;
