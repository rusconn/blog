import { createClient } from "microcms-js-sdk";
import type { GetRequest } from "microcms-js-sdk/dist/cjs/types";
import type { MarkRequired, StrictOmit } from "ts-essentials";

import { API_DOMAIN, API_KEY } from "./config";

type GetParam = StrictOmit<GetRequest, "endpoint">;
type GetListParam = StrictOmit<GetParam, "contentId">;
type GetOneParam = MarkRequired<GetParam, "contentId">;

const ApiClient = class {
  private client;

  private postsBase = "posts";

  private tagsBase = "tags";

  constructor() {
    this.client = createClient({
      serviceDomain: API_DOMAIN,
      apiKey: API_KEY,
    });
  }

  private getList<T>(request: GetRequest) {
    return this.client.get<ListResponse<T>>(request);
  }

  private get<T>(request: GetRequest) {
    return this.client.get<T>(request);
  }

  getPosts<T extends Partial<Post>>(param: GetListParam = {}) {
    return this.getList<T>({ ...param, endpoint: this.postsBase });
  }

  getPost<T extends Partial<Post>>(param: GetOneParam) {
    return this.get<T>({ ...param, endpoint: this.postsBase });
  }

  getTags<T extends Partial<Tag>>(param: GetListParam = {}) {
    return this.getList<T>({ ...param, endpoint: this.tagsBase });
  }

  getTag<T extends Partial<Tag>>(param: GetOneParam) {
    return this.get<T>({ ...param, endpoint: this.tagsBase });
  }
};

type ListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

type Draft<T> = {
  id: string;
  createdAt: string;
  updatedAt: string;
} & T;

type Published<T> = T & {
  publishedAt: string;
  revisedAt: string;
};

export type DraftTag = Draft<{
  name: string;
}>;

export type DraftPost = Draft<{
  title: string;
  body: string;
  tags?: Tag[];
}>;

export type Tag = Published<DraftTag>;
export type Post = Published<DraftPost>;

export const client = new ApiClient();
