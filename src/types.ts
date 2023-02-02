import type { TAGS } from "./constants";

export type PostFrontmatter = {
  title: string;
  slug: string;
  date: string;
  tags: typeof TAGS[number]["slug"][];
};
