import type { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { gql } from "graphql-request";

import { HomeQuery, HomeQueryVariables } from "@/generated/graphql";
import { Biography, Posts, Tags, HOME_TAGS_FRAGMENT, HOME_POSTS_FRAGMENT } from "@/components/home";
import { Layout } from "@/components/layout";
import { siteTitle } from "@/constants";
import { client, previewClient } from "@/libs/api";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<Props> = ({ tags, posts, preview }) => (
  <Layout home preview={preview}>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <div className="headingMd my-4">
      <Biography />
    </div>
    <div className="headingMd mt-[1.4rem] mb-4">
      <Tags fragments={tags} />
    </div>
    <div className="headingMd padding1px">
      <Posts fragments={posts} />
    </div>
  </Layout>
);

export const getStaticProps = async ({ preview = false }: GetStaticPropsContext) => {
  const clientToUse = preview ? previewClient : client;

  const data = await clientToUse.request<HomeQuery, HomeQueryVariables>(gql`
    query Home {
      tags {
        id
        ...HomeTagsFields
      }
      posts(orderBy: date_DESC) {
        id
        ...HomePostsFields
      }
    }
    ${HOME_TAGS_FRAGMENT}
    ${HOME_POSTS_FRAGMENT}
  `);

  return {
    props: {
      ...data,
      preview,
    },
    revalidate: 60,
  };
};

export default Home;
