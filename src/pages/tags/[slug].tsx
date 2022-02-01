import type { GetStaticPaths, GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";
import InferNextPropsType from "infer-next-props-type"; // eslint-disable-line

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

import * as utilStyles from "@/styles/utils";

type Props = InferNextPropsType<typeof getStaticProps>;

const Tag: NextPage<Props> = ({ tag, preview }) => (
  <Layout preview={preview}>
    <Head>
      <title>{tag.name}</title>
    </Head>
    <section css={[utilStyles.headingMd, utilStyles.padding1px]}>
      <h2 css={utilStyles.headingLg}>{tag.name} Posts</h2>
      <ul css={utilStyles.list}>
        {tag.posts.map(({ id, slug, date, title }) => (
          <li css={utilStyles.listItem} key={id}>
            <Link href={pagesPath.posts._slug(slug).$url()} prefetch={false}>
              <a>{title}</a>
            </Link>
            <br />
            <small css={utilStyles.lightText}>
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

  try {
    const { data } = await clientToUse.query<TagQuery, TagQueryVariables>({
      query: gql`
        query Tag($where: TagWhereUniqueInput!, $stage: Stage!) {
          tag(where: $where, stage: $stage) {
            id
            name
            posts {
              id
              slug
              title
              date
            }
          }
        }
      `,
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

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const { data } = await client.query<TagPathsQuery, TagPathsQueryVariables>({
    query: gql`
      query TagPaths {
        tags {
          id
          slug
          posts {
            id
          }
        }
      }
    `,
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
