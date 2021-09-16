import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";

import Layout from "@/components/layout";
import DateComponent from "@/components/date";
import * as Api from "@/libs/api";

import utilStyles from "@/styles/utils.module.css";
import "github-markdown-css";

// Infer できない: https://github.com/vercel/next.js/issues/15913
type Props = {
  post: PropPost;
  preview: boolean;
};

type PropPost = {
  title: string;
  publishedAt: string;
  body: string;
};

const Post: NextPage<Props> = ({ post, preview }) => (
  <Layout preview={preview}>
    <Head>
      <title>{post.title}</title>
    </Head>
    <article>
      <h1 className={utilStyles.headingXl}>{post.title}</h1>
      <div className={utilStyles.lightText}>
        <DateComponent dateString={post.publishedAt} />
      </div>
      <div
        className={`markdown-body ${utilStyles.markdownMargin}`}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: post.body }}
      />
    </article>
  </Layout>
);

type PathParams = {
  id: string;
};

export const getStaticProps: GetStaticProps<Props, PathParams> = async ({
  params,
  preview = false,
  previewData,
}) => {
  const contentId = params?.id;

  if (!contentId) {
    return { notFound: true };
  }

  const getPropPost = async () => {
    if (preview) {
      const { draftKey } = previewData as { draftKey?: string };

      const apiDraftPostFields = ["title", "body"] as const;
      type ApiDraftPostFields = typeof apiDraftPostFields[number];
      type ApipDraftPost = Pick<Api.DraftPost, ApiDraftPostFields>;

      const draftPost = await Api.client.getPost<ApipDraftPost>({
        contentId,
        queries: { fields: apiDraftPostFields.join(), draftKey },
      });

      return { ...draftPost, publishedAt: new Date().toISOString() };
    } else {
      const apiPostFields = ["title", "body", "publishedAt"] as const;
      type ApiPostFields = typeof apiPostFields[number];
      type ApiPost = Pick<Api.Post, ApiPostFields>;

      return Api.client.getPost<ApiPost>({
        contentId,
        queries: { fields: apiPostFields.join() },
      });
    }
  };

  try {
    const post = await getPropPost();

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
