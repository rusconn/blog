import type { TAGS } from "./constants";

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags: typeof TAGS[number]["slug"][];
};
