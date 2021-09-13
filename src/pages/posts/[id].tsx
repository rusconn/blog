import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";

import Layout from "../../components/layout";
import Date from "../../components/date";
import * as Api from "../../libs/api";

import utilStyles from "../../styles/utils.module.css";

// Infer できない: https://github.com/vercel/next.js/issues/15913
type Props = {
  post: PropPost;
};

type PropPost = {
  title: string;
  publishedAt: string;
  body: string;
};

const Post: NextPage<Props> = ({ post }) => (
  <Layout>
    <Head>
      <title>{post.title}</title>
    </Head>
    <article>
      <h1 className={utilStyles.headingXl}>{post.title}</h1>
      <div className={utilStyles.lightText}>
        <Date dateString={post.publishedAt} />
      </div>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
    </article>
  </Layout>
);

type PathParams = {
  id: string;
};

export const getStaticProps: GetStaticProps<Props, PathParams> = async ({ params }) => {
  const contentId = params?.id;

  if (!contentId) {
    return { notFound: true };
  }

  try {
    const apiPostFields = ["title", "body", "publishedAt"] as const;
    type ApiPostFields = typeof apiPostFields[number];
    type ApiPost = Pick<Api.Post, ApiPostFields>;

    const post = await Api.client.getPost<ApiPost>({
      contentId,
      queries: { fields: apiPostFields.join() },
    });

    return {
      props: {
        post,
      },
      revalidate: 60,
    };
  } catch (e) {
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const apiPostIdField = ["id"] as const;
  type ApiPostIdField = typeof apiPostIdField[number];
  type ApiPostId = Pick<Api.Post, ApiPostIdField>;

  const { contents } = await Api.client.getPosts<ApiPostId>({
    queries: { fields: apiPostIdField.join() },
  });

  const paths = contents.map(({ id }) => ({ params: { id } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export default Post;
