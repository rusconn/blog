import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";

import {
  Stage,
  TagQuery,
  TagQueryVariables,
  TagPathsQuery,
  TagPathsQueryVariables,
} from "@/generated/graphql";
import Layout from "@/components/layout";
import DateComponent from "@/components/date";
import { client, previewClient } from "@/libs/api";
import { pagesPath } from "@/libs/$path";

import utilStyles from "@/styles/utils.module.css";

// Infer できない: https://github.com/vercel/next.js/issues/15913
type Props = {
  tag: PropTag;
  preview: boolean;
};

type PropTag = {
  id: string;
  slug: string;
  name: string;
  posts: PropPost[];
};

type PropPost = {
  id: string;
  slug: string;
  title: string;
  date: string;
};

const Tag: NextPage<Props> = ({ tag, preview }) => (
  <Layout preview={preview}>
    <Head>
      <title>{tag.name}</title>
    </Head>
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className={utilStyles.headingLg}>{tag.name} Posts</h2>
      <ul className={utilStyles.list}>
        {tag.posts.map(({ id, slug, date, title }) => (
          <li className={utilStyles.listItem} key={id}>
            <Link href={pagesPath.posts._slug(slug).$url()} prefetch={false}>
              <a>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <DateComponent dateString={date} />
            </small>
          </li>
        ))}
      </ul>
    </section>
  </Layout>
);

type PathParams = {
  slug: string;
};

const TAG_QUERY = gql`
  query Tag($where: TagWhereUniqueInput!, $stage: Stage!) {
    tag(where: $where, stage: $stage) {
      id
      slug
      name
      posts {
        id
        slug
        title
        date
      }
    }
  }
`;

export const getStaticProps: GetStaticProps<Props, PathParams> = async ({
  params,
  preview = false,
}) => {
  const { slug } = params ?? {};

  if (!slug) {
    return { notFound: true } as const;
  }

  const stage = preview ? Stage.Draft : Stage.Published;
  const clientToUse = preview ? previewClient : client;

  try {
    const { data } = await clientToUse.query<TagQuery, TagQueryVariables>({
      query: TAG_QUERY,
      variables: { where: { slug }, stage },
    });

    const { tag } = data;

    if (!tag) {
      throw new Error("not found.");
    }

    return {
      props: {
        tag,
        preview,
      },
      revalidate: 60,
    };
  } catch (e) {
    return { notFound: true } as const;
  }
};

const TAG_PATHS_QUERY = gql`
  query TagPaths {
    tags {
      id
      slug
      posts {
        id
      }
    }
  }
`;

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const { data } = await client.query<TagPathsQuery, TagPathsQueryVariables>({
    query: TAG_PATHS_QUERY,
  });

  const paths = data.tags
    .filter(({ posts }) => posts.length)
    .map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export default Tag;
