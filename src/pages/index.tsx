import { css } from "@emotion/react";
import type { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { gql } from "@apollo/client";

import { HomeQuery, HomeQueryVariables } from "@/generated/graphql";
import { Biography, Posts, Tags } from "@/components/home";
import { Layout } from "@/components/layout";
import { siteTitle } from "@/constants";
import { client, previewClient } from "@/libs/api";

import * as utilStyles from "@/styles/utils";

const tagsMargin = css`
  margin-top: 1.4rem;
`;

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<Props> = ({ tags, posts, preview }) => (
  <Layout home preview={preview}>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <div css={utilStyles.headingMd}>
      <Biography />
    </div>
    <div css={[utilStyles.headingMd, tagsMargin]}>
      <Tags tags={tags} />
    </div>
    <div css={[utilStyles.headingMd, utilStyles.padding1px]}>
      <Posts posts={posts} />
    </div>
  </Layout>
);

export const getStaticProps = async ({ preview = false }: GetStaticPropsContext) => {
  const clientToUse = preview ? previewClient : client;

  const { data } = await clientToUse.query<HomeQuery, HomeQueryVariables>({
    query: gql`
      query Home {
        tags {
          id
          slug
          name
        }
        posts(orderBy: date_DESC) {
          id
          slug
          title
          date
        }
      }
    `,
  });

  return {
    props: {
      ...data,
      preview,
    },
    revalidate: 60,
  };
};

export default Home;
