import type { NextApiHandler } from "next";

import routes from "../../libs/routes";

type Message = {
  message: string;
};

const handler: NextApiHandler<Message> = (_req, res) => {
  res.clearPreviewData();
  res.redirect(routes.top);
};

export default handler;
