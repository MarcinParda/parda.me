import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://parda.me",
  integrations: [tailwind()],
  redirects: {
    "/": "/about",
  },
  prefetch: {
    prefetchAll: true,
  },
});
