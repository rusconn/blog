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
import { Article, renderMarkdown, POSTS_ARTICLE_FRAGMENT } from "@/components/posts";
import { client, previewClient } from "@/libs/api";

type Props = InferNextPropsType<typeof getStaticProps>;

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

  const { error, errors, data } = await clientToUse.query<PostQuery, PostQueryVariables>({
    query: gql`
      query Post($slug: String!, $stage: Stage!) {
        post(where: { slug: $slug }, stage: $stage) {
          id
          ...PostsArticleFields
        }
      }
      ${POSTS_ARTICLE_FRAGMENT}
    `,
    variables: { slug, stage },
  });

  if (error) {
    throw error;
  }

  if (errors) {
    errors.forEach(e => console.error(e));
    throw new Error("some errors occurred");
  }

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
  const { error, errors, data } = await client.query<PostPathsQuery, PostPathsQueryVariables>({
    query: gql`
      query PostPaths {
        posts {
          id
          slug
        }
      }
    `,
  });

  if (error) {
    throw error;
  }

  if (errors) {
    errors.forEach(e => console.error(e));
    throw new Error("some errors occurred");
  }

  const paths = data.posts.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export default Post;
