import { gql } from "graphql-request";
import { notFound } from "next/navigation";

import {
  PostQuery,
  PostQueryVariables,
  PostPathsQuery,
  PostPathsQueryVariables,
} from "@/generated/graphql";
import { client, getClient } from "@/libs/api";
import { Article, POST_ARTICLE_FRAGMENT } from "./components";

type Params = {
  params: {
    slug: string;
  };
};

const Post = async ({ params }: Params) => {
  const { post } = await getData(params.slug);

  if (!post) {
    notFound();
  }

  return <Article fragment={post} />;
};

const getData = async (slug: string) =>
  getClient().request<PostQuery, PostQueryVariables>(
    gql`
      query Post($where: PostWhereUniqueInput!) {
        post(where: $where) {
          ...PostArticle
        }
      }
      ${POST_ARTICLE_FRAGMENT}
    `,
    { where: { slug } }
  );

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
