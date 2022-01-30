import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";

import Layout from "@/components/layout";
import DateComponent from "@/components/date";
import * as Api from "@/libs/api";
import highlightCodes from "@/libs/html";
import { pagesPath } from "@/libs/$path";

import utilStyles from "@/styles/utils.module.css";
import "github-markdown-css";
import "highlight.js/styles/github.css";
import Link from "next/link";

// Infer できない: https://github.com/vercel/next.js/issues/15913
type Props = {
  post: PropPost;
  preview: boolean;
};

type PropPost = {
  title: string;
  publishedAt: string;
  body: string;
  tags: Tag[];
};

type Tag = {
  id: string;
  name: string;
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
      <ul className={utilStyles.tagsList}>
        {post.tags.map(({ id, name }) => (
          <li className={utilStyles.tagsListItem} key={id}>
            <Link href={pagesPath.tags._id(id).$url()} prefetch={false}>
              <a className={utilStyles.tagLink}>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <div
        className={`markdown-body ${utilStyles.markdownMargin}`}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: highlightCodes(post.body) }}
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

      const apiDraftPostFields = ["title", "body", "tags"] as const;
      type ApiDraftPostFields = typeof apiDraftPostFields[number];
      type ApipDraftPost = Pick<Api.DraftPost, ApiDraftPostFields>;

      const draftPost = await Api.client.getPost<ApipDraftPost>({
        contentId,
        queries: { fields: apiDraftPostFields.join(), draftKey },
      });

      return { ...draftPost, publishedAt: new Date().toISOString() };
    } else {
      const apiPostFields = ["title", "body", "tags", "publishedAt"] as const;
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
        post: {
          ...post,
          tags: post.tags ?? [],
        },
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
