import { GraphQLClient } from "graphql-request";
import { RequestInit } from "graphql-request/dist/types.dom";

import { parseEnvs } from "@/libs/env";
import { isPreview } from "./preview";

const { apiUrl, draftToken, publishedToken } = parseEnvs(process.env);

export const client = new GraphQLClient(apiUrl, {
  requestMiddleware: (request: RequestInit) => ({
    ...request,
    headers: {
      ...request.headers,
      authorization: `Bearer ${isPreview() ? draftToken : publishedToken}`,
    },
  }),
});

// ビルド時はプレビュー関連 API を使えないようなので用意した
export const buildClient = new GraphQLClient(apiUrl, {
  headers: {
    authorization: `Bearer ${publishedToken}`,
  },
});
