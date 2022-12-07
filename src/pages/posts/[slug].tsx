import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { gql } from "graphql-request";

import {
  Stage,
  Post as IPost,
  PostQuery,
  PostQueryVariables,
  PostPathsQuery,
  PostPathsQueryVariables,
} from "@/generated/graphql";
import { Layout } from "@/components/layout";
import { Article, renderMarkdown, POSTS_ARTICLE_FRAGMENT } from "@/components/posts";
import { client, previewClient } from "@/libs/api";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Post: NextPage<Props> = ({ post: { body, ...rest }, preview }) => (
  <Layout preview={preview}>
    <Head>
      <title>{rest.title}</title>
    </Head>
    <Article fragment={rest} body={body} />
  </Layout>
);

type PathParams = {
  slug: IPost["slug"];
};

export const getStaticProps = async ({
  params,
  preview = false,
}: GetStaticPropsContext<PathParams>) => {
  const { slug } = params as { slug?: string };

  if (!slug) {
    return { notFound: true };
  }

  const stage = preview ? Stage.Draft : Stage.Published;
  const clientToUse = preview ? previewClient : client;

  const data = await clientToUse.request<PostQuery, PostQueryVariables>(
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

  const { post } = data;

  if (!post) {
    return { notFound: true };
  }

  const { body } = await renderMarkdown(post);

  return {
    props: {
      post: { ...post, body },
      preview,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const data = await client.request<PostPathsQuery, PostPathsQueryVariables>(gql`
    query PostPaths {
      posts {
        slug
      }
    }
  `);

  const paths = data.posts.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export default Post;
