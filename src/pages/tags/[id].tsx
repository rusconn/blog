import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Layout from "@/components/layout";
import DateComponent from "@/components/date";
import * as Api from "@/libs/api";
import { pagesPath } from "@/libs/$path";

import utilStyles from "@/styles/utils.module.css";

type Props = {
  tag: PropTag;
  preview: boolean;
};

type PropTag = {
  id: string;
  name: string;
  posts: Post[];
};

type Post = {
  id: string;
  title: string;
  publishedAt: string;
};

const Tag: NextPage<Props> = ({ tag, preview }) => (
  <Layout preview={preview}>
    <Head>
      <title>{tag.name}</title>
    </Head>
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className={utilStyles.headingLg}>{tag.name} Posts</h2>
      <ul className={utilStyles.list}>
        {tag.posts.map(({ id, publishedAt, title }) => (
          <li className={utilStyles.listItem} key={id}>
            <Link href={pagesPath.posts._id(id).$url()} prefetch={false}>
              <a>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <DateComponent dateString={publishedAt} />
            </small>
          </li>
        ))}
      </ul>
    </section>
  </Layout>
);

type PathParams = {
  id: string;
};

export const getStaticProps: GetStaticProps<Props, PathParams> = async ({
  params,
  preview = false,
  previewData,
}) => {
  const contentId = params?.id;

  if (!contentId) {
    return { notFound: true };
  }

  const getPropTag = async () => {
    if (preview) {
      const { draftKey } = previewData as { draftKey?: string };

      const apiDraftTagFields = ["id", "name", "posts"] as const;
      type ApiDraftTagFields = typeof apiDraftTagFields[number];
      type ApiDraftTag = Pick<Api.DraftTag, ApiDraftTagFields>;

      const draftTag = await Api.client.getTag<ApiDraftTag>({
        contentId,
        queries: { fields: apiDraftTagFields.join(), draftKey },
      });

      return { ...draftTag, publishedAt: new Date().toISOString() };
    } else {
      const apiTagFields = ["id", "name", "posts", "publishedAt"] as const;
      type ApiTagFields = typeof apiTagFields[number];
      type ApiTag = Pick<Api.Tag, ApiTagFields>;

      return Api.client.getTag<ApiTag>({
        contentId,
        queries: { fields: apiTagFields.join() },
      });
    }
  };

  try {
    const tag = await getPropTag();

    return {
      props: {
        tag: {
          ...tag,
          posts: tag.posts ?? [],
        },
        preview,
      },
      revalidate: 60,
    };
  } catch (e) {
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const apiTagIdField = ["id"] as const;
  type ApiTagIdField = typeof apiTagIdField[number];
  type ApiTagId = Pick<Api.Tag, ApiTagIdField>;

  const { contents } = await Api.client.getTags<ApiTagId>({
    queries: { fields: apiTagIdField.join() },
  });

  const paths = contents.map(({ id }) => ({ params: { id } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export default Tag;
