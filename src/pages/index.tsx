import type { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";

import { HomeQuery, HomeQueryVariables } from "@/generated/graphql";
import Layout, { siteTitle } from "@/components/layout";
import Date from "@/components/date";
import { client, previewClient } from "@/libs/api";
import { pagesPath } from "@/libs/$path";
import * as utilStyles from "@/styles/utils";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<Props> = ({ tags, posts, preview }) => (
  <Layout home preview={preview}>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section css={utilStyles.headingMd}>
      <p>
        Software Engineer.
        <br />
        TypeScript, React, Apollo, Lambda, DynamoDB, S3, ...
      </p>
    </section>
    <section css={utilStyles.headingMd}>
      <ul css={utilStyles.tagsList}>
        {tags.map(({ id, slug, name }) => (
          <li css={utilStyles.tagsListItem} key={id}>
            <Link href={pagesPath.tags._slug(slug).$url()} passHref prefetch={false}>
              <a css={utilStyles.tagLink}>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
    <section css={[utilStyles.headingMd, utilStyles.padding1px]}>
      <h2 css={utilStyles.headingLg}>Posts</h2>
      <ul css={utilStyles.list}>
        {posts.map(({ id, slug, date, title }) => (
          <li css={utilStyles.listItem} key={id}>
            <Link href={pagesPath.posts._slug(slug).$url()} prefetch={false}>
              <a>{title}</a>
            </Link>
            <br />
            <small css={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
        ))}
      </ul>
    </section>
  </Layout>
);

export const HOME_QUERY = gql`
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
`;

export const getStaticProps = async ({ preview = false }: GetStaticPropsContext) => {
  const clientToUse = preview ? previewClient : client;

  const { data } = await clientToUse.query<HomeQuery, HomeQueryVariables>({
    query: HOME_QUERY,
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
