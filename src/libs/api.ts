import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import {
  GRAPHCMS_PROD_AUTH_TOKEN,
  GRAPHCMS_DEV_AUTH_TOKEN,
  GRAPHCMS_PROJECT_API,
} from "@/libs/config";
import { Node } from "@/generated/graphql";

type CreateClientParams = {
  preview: boolean;
};

// クライアント作成後にヘッダを上書きする方法がわからなかったのでファクトリ化
const createClient = ({ preview }: CreateClientParams) => {
  type Context = {
    headers: Record<string, unknown>;
  };

  const httpLink = new HttpLink({
    uri: GRAPHCMS_PROJECT_API,
  });

  const authLink = setContext((_, { headers }: Context) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${preview ? GRAPHCMS_DEV_AUTH_TOKEN : GRAPHCMS_PROD_AUTH_TOKEN}`,
    },
  }));

  const keyFields: (keyof Node)[] = ["id"];

  const cache = new InMemoryCache({
    typePolicies: {
      Post: {
        keyFields,
      },
      Tag: {
        keyFields,
      },
    },
  });

  return new ApolloClient({
    link: from([authLink, httpLink]),
    cache,
  });
};

// Node.js のモジュールキャッシュが効いて再利用される？
export const client = createClient({ preview: false });
export const previewClient = createClient({ preview: true });
