import { GraphQLClient } from "graphql-request";

import {
  GRAPHCMS_PROD_AUTH_TOKEN,
  GRAPHCMS_DEV_AUTH_TOKEN,
  GRAPHCMS_PROJECT_API,
} from "@/libs/config";

type CreateClientParams = {
  preview: boolean;
};

const createClient = ({ preview }: CreateClientParams) =>
  new GraphQLClient(GRAPHCMS_PROJECT_API, {
    headers: {
      authorization: `Bearer ${preview ? GRAPHCMS_DEV_AUTH_TOKEN : GRAPHCMS_PROD_AUTH_TOKEN}`,
    },
  });

// Node.js のモジュールキャッシュが効いて再利用される？
export const client = createClient({ preview: false });
export const previewClient = createClient({ preview: true });
