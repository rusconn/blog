import type { GetStaticPaths, GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
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
import Layout from "@/components/layout";
import DateComponent from "@/components/date";
import { client, previewClient } from "@/libs/api";
import highlightCodes from "@/libs/html";
import { pagesPath } from "@/libs/$path";

import * as utilStyles from "@/styles/utils";
import "github-markdown-css";
import "highlight.js/styles/github.css";

type Props = InferNextPropsType<typeof getStaticProps>;

const Post: NextPage<Props> = ({ post, preview }) => (
  <Layout preview={preview}>
    <Head>
      <title>{post.title}</title>
    </Head>
    <article>
      <h1 css={utilStyles.headingXl}>{post.title}</h1>
      <div css={utilStyles.lightText}>
        <DateComponent dateString={post.date} />
      </div>
      <ul css={utilStyles.tagsList}>
        {post.tags.map(({ id, slug, name }) => (
          <li css={utilStyles.tagsListItem} key={id}>
            <Link href={pagesPath.tags._slug(slug).$url()} passHref prefetch={false}>
              <a css={utilStyles.tagLink}>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <div
        css={utilStyles.markdownMargin}
        className="markdown-body"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: highlightCodes(post.body.html) }}
      />
    </article>
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

  try {
    const { data } = await clientToUse.query<PostQuery, PostQueryVariables>({
      query: gql`
        query Post($slug: String!, $stage: Stage!) {
          post(where: { slug: $slug }, stage: $stage) {
            id
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
      `,
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

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const { data } = await client.query<PostPathsQuery, PostPathsQueryVariables>({
    query: gql`
      query PostPaths {
        posts {
          id
          slug
        }
      }
    `,
  });

  const paths = data.posts.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export default Post;
