import type { NextApiHandler } from "next";

import { pagesPath } from "../../libs/$path";

type Message = {
  message: string;
};

const handler: NextApiHandler<Message> = (_req, res) => {
  res.clearPreviewData();
  res.redirect(pagesPath.$url().pathname);
};

export default handler;
