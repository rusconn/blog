import type { GetStaticPaths, GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";
import { gql } from "graphql-request";
import InferNextPropsType from "infer-next-props-type"; // eslint-disable-line

import {
  Stage,
  TagQuery,
  TagQueryVariables,
  TagPathsQuery,
  TagPathsQueryVariables,
} from "@/generated/graphql";
import { Layout } from "@/components/layout";
import { Posts, TAGS_POSTS_FRAGMENT } from "@/components/tags";
import { client, previewClient } from "@/libs/api";

type Props = InferNextPropsType<typeof getStaticProps>;

const Tag: NextPage<Props> = ({ tag, preview }) => (
  <Layout preview={preview}>
    <Head>
      <title>{tag.name}</title>
    </Head>
    <div className="headingMd">
      <Posts fragment={tag} />
    </div>
  </Layout>
);

type PathParams = {
  slug: string;
};

export const getStaticProps = async ({
  params,
  preview = false,
}: GetStaticPropsContext<PathParams>) => {
  const { slug } = params ?? {};

  if (!slug) {
    return { notFound: true } as const;
  }

  const stage = preview ? Stage.Draft : Stage.Published;
  const clientToUse = preview ? previewClient : client;

  const data = await clientToUse.request<TagQuery, TagQueryVariables>(
    gql`
      query Tag($where: TagWhereUniqueInput!, $stage: Stage!) {
        tag(where: $where, stage: $stage) {
          ...TagsPostsFields
        }
      }
      ${TAGS_POSTS_FRAGMENT}
    `,
    { where: { slug }, stage }
  );

  const { tag } = data;

  if (!tag) {
    return { notFound: true };
  }

  return {
    props: {
      tag,
      preview,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const data = await client.request<TagPathsQuery, TagPathsQueryVariables>(gql`
    query TagPaths {
      tags {
        slug
        posts {
          id
        }
      }
    }
  `);

  const paths = data.tags
    .filter(({ posts }) => posts.length)
    .map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export default Tag;
