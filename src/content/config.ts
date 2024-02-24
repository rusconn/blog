import { z, defineCollection } from "astro:content";

const postCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(
      z.union([
        z.literal("typescript"),
        z.literal("docker"),
        z.literal("git"),
        z.literal("vscode"),
        z.literal("others"),
      ]),
    ),
  }),
});

export const collections = {
  posts: postCollection,
};
