import type { GetStaticPaths, GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";
import { gql } from "@apollo/client";
import InferNextPropsType from "infer-next-props-type"; // eslint-disable-line

import {
  Stage,
  Post as IPost,
  PostQuery,
  PostQueryVariables,
  PostPathsQuery,
  PostPathsQueryVariables,
} from "@/generated/graphql";
import { Layout } from "@/components/layout";
import { Article } from "@/components/posts";
import { client, previewClient } from "@/libs/api";

type Props = InferNextPropsType<typeof getStaticProps>;

const Post: NextPage<Props> = ({ post, preview }) => (
  <Layout preview={preview}>
    <Head>
      <title>{post.title}</title>
    </Head>
    <Article post={post} html={post.body.html} tags={post.tags} />
  </Layout>
);

type PathParams = {
  slug: IPost["slug"];
};

export const POST_QUERY = gql`
  query Post($slug: String!, $stage: Stage!) {
    post(where: { slug: $slug }, stage: $stage) {
      id
      slug
      title
      date
      body {
        html
      }
      tags {
        id
        slug
        name
      }
    }
  }
`;

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

  try {
    const { data } = await clientToUse.query<PostQuery, PostQueryVariables>({
      query: POST_QUERY,
      variables: { slug, stage },
    });

    const { post } = data;

    if (!post) {
      throw new Error("not found.");
    }

    return {
      props: {
        post,
        preview,
      },
      revalidate: 60,
    };
  } catch (e) {
    return { notFound: true };
  }
};

export const POST_PATHS_QUERY = gql`
  query PostPaths {
    posts {
      id
      slug
    }
  }
`;

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const { data } = await client.query<PostPathsQuery, PostPathsQueryVariables>({
    query: POST_PATHS_QUERY,
  });

  const paths = data.posts.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export default Post;
