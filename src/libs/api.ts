import { GraphQLClient } from "graphql-request";

import { parseEnvs } from "@/libs/env";

type CreateClientParams = {
  preview: boolean;
};

const createClient = ({ preview }: CreateClientParams) => {
  const { apiUrl, draftToken, publishedToken } = parseEnvs(process.env);

  return new GraphQLClient(apiUrl, {
    headers: {
      authorization: `Bearer ${preview ? draftToken : publishedToken}`,
    },
  });
};

// Node.js のモジュールキャッシュが効いて再利用される？
export const client = createClient({ preview: false });
export const previewClient = createClient({ preview: true });
