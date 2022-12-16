import { gql } from "graphql-request";
import { notFound } from "next/navigation";

import { siteTitle } from "@/constants";
import { PostHeadQuery, PostHeadQueryVariables } from "@/generated/graphql";
import { client } from "@/libs/api";

type Params = {
  params: {
    slug: string;
  };
};

export default async function Head({ params }: Params) {
  const { post } = await getData(params.slug);

  if (!post) {
    notFound();
  }

  // TODO: マークダウンのパース
  const description = post.body.split("\n").at(0)?.slice(0, 100);

  return (
    <>
      <title>{`${post.title} - ${siteTitle}`}</title>
      <meta
        name="description"
        content={description ?? "Blog posts by @rusconn"}
        key="description"
      />
      <meta property="og:title" content={post.title} key="og-title" />
      <meta
        property="og:url"
        content={`https://blog-rusconn.vercel.app/posts/${params.slug}`}
        key="og-url"
      />
      <meta
        property="og:description"
        content={description ?? "Blog posts by @rusconn"}
        key="og-description"
      />
    </>
  );
}

const getData = async (slug: string) =>
  client.request<PostHeadQuery, PostHeadQueryVariables>(
    gql`
      query PostHead($where: PostWhereUniqueInput!) {
        post(where: $where) {
          title
          body
        }
      }
    `,
    { where: { slug } }
  );
