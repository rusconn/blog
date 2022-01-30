import type { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";

import { HomeQuery, HomeQueryVariables } from "@/generated/graphql";
import Layout, { siteTitle } from "@/components/layout";
import Date from "@/components/date";
import { client, previewClient } from "@/libs/api";
import { pagesPath } from "@/libs/$path";

import utilStyles from "@/styles/utils.module.css";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<Props> = ({ tags, posts, preview }) => (
  <Layout home preview={preview}>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section className={utilStyles.headingMd}>
      <p>
        Software Engineer.
        <br />
        TypeScript, React, Apollo, Lambda, DynamoDB, S3, ...
      </p>
    </section>
    <section className={utilStyles.headingMd}>
      <ul className={utilStyles.tagsList}>
        {tags.map(({ id, slug, name }) => (
          <li className={utilStyles.tagsListItem} key={id}>
            <Link href={pagesPath.tags._slug(slug).$url()} prefetch={false}>
              <a className={utilStyles.tagLink}>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className={utilStyles.headingLg}>Posts</h2>
      <ul className={utilStyles.list}>
        {posts.map(({ id, slug, date, title }) => (
          <li className={utilStyles.listItem} key={id}>
            <Link href={pagesPath.posts._slug(slug).$url()} prefetch={false}>
              <a>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
        ))}
      </ul>
    </section>
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
