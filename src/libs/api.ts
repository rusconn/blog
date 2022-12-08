import { GraphQLClient } from "graphql-request";

import { parseEnvs } from "@/libs/env";
import { isPreview } from "./preview";

const { apiUrl, draftToken, publishedToken } = parseEnvs(process.env);

const createClient = (token: string) =>
  new GraphQLClient(apiUrl, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

// Node.js のモジュールキャッシュが効いて再利用される？
export const client = createClient(publishedToken);
export const previewClient = createClient(draftToken);

export const getClient = () => (isPreview() ? previewClient : client);
