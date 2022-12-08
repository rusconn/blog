import { gql } from "graphql-request";

import { PostHeadQuery, PostHeadQueryVariables, Stage } from "@/generated/graphql";
import { previewClient, client } from "@/libs/api";
import { isPreview } from "@/libs/preview";

type Params = {
  params: {
    slug: string;
  };
};

const Head = async ({ params }: Params) => {
  const preview = isPreview();
  const { post } = await getData(preview, params.slug);

  return (
    <>
      <title>{post?.title}</title>
    </>
  );
};

const getData = async (preview: boolean, slug: string) => {
  const stage = preview ? Stage.Draft : Stage.Published;
  const clientToUse = preview ? previewClient : client;

  return clientToUse.request<PostHeadQuery, PostHeadQueryVariables>(
    gql`
      query PostHead($where: PostWhereUniqueInput!, $stage: Stage!) {
        post(where: $where, stage: $stage) {
          title
        }
      }
    `,
    { where: { slug }, stage }
  );
};

export default Head;
