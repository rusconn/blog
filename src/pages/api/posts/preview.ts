/* eslint-disable no-console */

import type { NextApiHandler } from "next";

import * as Api from "../../../libs/api";
import { PREVIEW_MODE_MAX_AGE } from "../../../libs/config";
import routes from "../../../libs/routes";

type Message = {
  message: string;
};

type Params = {
  slug?: string;
  draftKey?: string;
};

const handler: NextApiHandler<Message> = async (req, res) => {
  const { slug, draftKey } = req.query as Params;

  if (!slug) {
    res.status(400).json({ message: "lacking slug" });
    return;
  }

  try {
    const apiPostIdField = ["id"] as const;
    type ApiPostIdField = typeof apiPostIdField[number];
    type ApiPostId = Pick<Api.Post, ApiPostIdField>;

    const post = await Api.client.getPost<ApiPostId>({
      contentId: slug,
      queries: { fields: apiPostIdField.join(), draftKey },
    });

    res.setPreviewData({ draftKey }, { maxAge: PREVIEW_MODE_MAX_AGE });

    res.redirect(routes.postsPost(post.id));
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: "Invalid request" });
  }
};

export default handler;
