import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";

import {
  Stage,
  Post as IPost,
  PostQuery,
  PostQueryVariables,
  PostPathsQuery,
  PostPathsQueryVariables,
} from "@/generated/graphql";
import Layout from "@/components/layout";
import DateComponent from "@/components/date";
import { client, previewClient } from "@/libs/api";
import highlightCodes from "@/libs/html";
import { pagesPath } from "@/libs/$path";

import utilStyles from "@/styles/utils.module.css";
import "github-markdown-css";
import "highlight.js/styles/github.css";

// Infer できない: https://github.com/vercel/next.js/issues/15913
type Props = {
  post: PropPost;
  preview: boolean;
};

type PropPost = {
  id: string;
  title: string;
  date: string;
  body: {
    html: string;
  };
  tags: Tag[];
};

type Tag = {
  id: string;
  slug: string;
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
        <DateComponent dateString={post.date} />
      </div>
      <ul className={utilStyles.tagsList}>
        {post.tags.map(({ id, slug, name }) => (
          <li className={utilStyles.tagsListItem} key={id}>
            <Link href={pagesPath.tags._slug(slug).$url()} prefetch={false}>
              <a className={utilStyles.tagLink}>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <div
        className={`markdown-body ${utilStyles.markdownMargin}`}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: highlightCodes(post.body.html) }}
      />
    </article>
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

export const getStaticProps: GetStaticProps<Props, PathParams> = async ({
  params,
  preview = false,
}) => {
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
