import type { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Layout, { siteTitle } from "@/components/layout";
import Date from "@/components/date";
import * as Api from "@/libs/api";
import { pagesPath } from "@/libs/$path";

import utilStyles from "@/styles/utils.module.css";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<Props> = ({ posts, preview }) => (
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
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className={utilStyles.headingLg}>Posts</h2>
      <ul className={utilStyles.list}>
        {posts.map(({ id, publishedAt, title }) => (
          <li className={utilStyles.listItem} key={id}>
            <Link href={pagesPath.posts._id(id).$url()} prefetch={false}>
              <a>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={publishedAt} />
            </small>
          </li>
        ))}
      </ul>
    </section>
  </Layout>
);

export const getStaticProps = async ({ preview = false }: GetStaticPropsContext) => {
  const apiPostFields = ["id", "publishedAt", "title"] as const;
  type ApiPostFields = typeof apiPostFields[number];
  type ApiPost = Pick<Api.Post, ApiPostFields>;

  const { contents } = await Api.client.getPosts<ApiPost>({
    queries: { orders: "-publishedAt", fields: apiPostFields.join() },
  });

  return {
    props: {
      posts: contents,
      preview,
    },
    revalidate: 60,
  };
};

export default Home;
