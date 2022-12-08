import type { NextApiHandler } from "next";

import { parseEnvs } from "@/libs/env";
import routes from "@/libs/routes";

export type Message = {
  message: string;
};

type Params = {
  slug?: string;
  secret?: string;
};

const handler: NextApiHandler<Message> = (req, res) => {
  const { previewSecret, previewMaxSeconds } = parseEnvs(process.env);

  const { slug, secret } = req.query as Params;

  if (!slug || secret !== previewSecret) {
    res.status(400).json({ message: "Invalid request" });
    return;
  }

  res.setPreviewData({}, { maxAge: previewMaxSeconds });
  res.redirect(routes.postsPost(slug));
};

export default handler;
