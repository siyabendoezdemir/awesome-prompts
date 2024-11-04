import { defineCollection, defineConfig } from "@content-collections/core";

const prompts = defineCollection({
  name: "prompts",
  directory: "content/prompts",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    emoji: z.string(),
    category: z.string(),
    author: z.string(),
    created: z.string().date(),
  }),
});

export default defineConfig({
  collections: [prompts],
});