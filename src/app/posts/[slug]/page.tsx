import { gql } from "graphql-request";
import { notFound } from "next/navigation";

import {
  Stage,
  PostQuery,
  PostQueryVariables,
  PostPathsQuery,
  PostPathsQueryVariables,
} from "@/generated/graphql";
import { client, previewClient } from "@/libs/api";
import { isPreview } from "@/libs/preview";
import { Article, POSTS_ARTICLE_FRAGMENT } from "./components";

type Params = {
  params: {
    slug: string;
  };
};

const Post = async ({ params }: Params) => {
  const preview = isPreview();
  const { post } = await getData(preview, params.slug);

  if (!post) {
    notFound();
  }

  const { body, ...rest } = post;

  return <Article fragment={rest} body={body} />;
};

const getData = async (preview: boolean, slug: string) => {
  const stage = preview ? Stage.Draft : Stage.Published;
  const clientToUse = preview ? previewClient : client;

  return clientToUse.request<PostQuery, PostQueryVariables>(
    gql`
      query Post($slug: String!, $stage: Stage!) {
        post(where: { slug: $slug }, stage: $stage) {
          ...PostsArticleFields
        }
      }
      ${POSTS_ARTICLE_FRAGMENT}
    `,
    { slug, stage }
  );
};

export const generateStaticParams = async () => {
  const data = await client.request<PostPathsQuery, PostPathsQueryVariables>(gql`
    query PostPaths {
      posts {
        slug
      }
    }
  `);

  return data.posts.map(({ slug }) => ({ slug }));
};

export const revalidate = 60;

export default Post;
