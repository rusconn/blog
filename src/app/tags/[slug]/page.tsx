import { gql } from "graphql-request";
import { notFound } from "next/navigation";

import {
  Stage,
  TagQuery,
  TagQueryVariables,
  TagPathsQuery,
  TagPathsQueryVariables,
} from "@/generated/graphql";
import { client, previewClient } from "@/libs/api";
import { isPreview } from "@/libs/preview";
import { Posts, TAGS_POSTS_FRAGMENT } from "./components";

type Params = {
  params: {
    slug: string;
  };
};

const Tag = async ({ params }: Params) => {
  const preview = isPreview();
  const { tag } = await getData(preview, params.slug);

  if (!tag) {
    notFound();
  }

  return (
    <div className="headingMd">
      <Posts fragment={tag} />
    </div>
  );
};

const getData = async (preview: boolean, slug: string) => {
  const stage = preview ? Stage.Draft : Stage.Published;
  const clientToUse = preview ? previewClient : client;

  return clientToUse.request<TagQuery, TagQueryVariables>(
    gql`
      query Tag($where: TagWhereUniqueInput!, $stage: Stage!) {
        tag(where: $where, stage: $stage) {
          ...TagsPostsFields
        }
      }
      ${TAGS_POSTS_FRAGMENT}
    `,
    { where: { slug }, stage }
  );
};

export const generateStaticParams = async () => {
  const data = await client.request<TagPathsQuery, TagPathsQueryVariables>(gql`
    query TagPaths {
      tags {
        slug
        posts {
          id
        }
      }
    }
  `);

  return data.tags.filter(({ posts }) => posts.length).map(({ slug }) => ({ slug }));
};

export const revalidate = 60;

export default Tag;
