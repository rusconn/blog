import { gql } from "graphql-request";
import { notFound } from "next/navigation";

import { TagHeadQuery, TagHeadQueryVariables } from "@/generated/graphql";
import { client } from "@/libs/api";

type Params = {
  params: {
    slug: string;
  };
};

export default async function Head({ params }: Params) {
  const { tag } = await getData(params.slug);

  if (!tag) {
    notFound();
  }

  return (
    <>
      <title>{tag.name}</title>
      <meta property="og:title" content={`${tag.name}の記事`} key="og-title" />
      <meta
        property="og:url"
        content={`https://blog-rusconn.vercel.app/tags/${params.slug}`}
        key="og-url"
      />
      <meta property="og:description" content="Blog posts by @rusconn" key="og-description" />
    </>
  );
}

const getData = async (slug: string) =>
  client.request<TagHeadQuery, TagHeadQueryVariables>(
    gql`
      query TagHead($where: TagWhereUniqueInput!) {
        tag(where: $where) {
          name
        }
      }
    `,
    { where: { slug } }
  );
