import { gql } from "graphql-request";

import { Stage, TagNameQuery, TagNameQueryVariables } from "@/generated/graphql";
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
  const stage = preview ? Stage.Draft : Stage.Published;
  const clientToUse = preview ? previewClient : client;

  return clientToUse.request<TagNameQuery, TagNameQueryVariables>(
    gql`
      query TagName($where: TagWhereUniqueInput!, $stage: Stage!) {
        tag(where: $where, stage: $stage) {
          name
        }
      }
    `,
    { where: { slug }, stage }
  );
};

export default Head;
