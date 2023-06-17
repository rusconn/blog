import { defineConfig } from "astro/config";

// https://astro.build/config
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

import rehypeExternalLinks from "rehype-external-links";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  markdown: {
    rehypePlugins: [[rehypeExternalLinks, { target: "_blank", rel: "noreferrer" }]],
    shikiConfig: {
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: "dark-plus",
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
      wrap: false,
    },
  },
});
