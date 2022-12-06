import type { NextApiHandler } from "next";
import { gql } from "graphql-request";

import { GRAPHCMS_PREVIEW_POST_SECRET, PREVIEW_MODE_MAX_AGE } from "@/libs/config";
import routes from "@/libs/routes";
import { previewClient } from "@/libs/api";
import { PostExistenceQuery, PostExistenceQueryVariables } from "@/generated/graphql";

export type Message = {
  message: string;
};

type Params = {
  slug?: string;
  secret?: string;
};

export const POST_EXISTENCE_QUERY = gql`
  query PostExistence($slug: String!) {
    post(where: { slug: $slug }, stage: DRAFT) {
      slug
    }
  }
`;

const handler: NextApiHandler<Message> = async (req, res) => {
  const { slug, secret } = req.query as Params;

  if (!slug || secret !== GRAPHCMS_PREVIEW_POST_SECRET) {
    res.status(400).json({ message: "Invalid request" });
    return;
  }

  try {
    const data = await previewClient.request<PostExistenceQuery, PostExistenceQueryVariables>(
      POST_EXISTENCE_QUERY,
      { slug }
    );

    if (!data.post) {
      res.status(400).json({ message: "Invalid request" });
      return;
    }

    res.setPreviewData({}, { maxAge: PREVIEW_MODE_MAX_AGE });

    res.redirect(routes.postsPost(data.post.slug));
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: "Invalid request" });
  }
};

export default handler;
