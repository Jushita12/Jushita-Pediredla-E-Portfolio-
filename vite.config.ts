import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  base: "/Jushita-Pediredla-E-Portfolio/", // Tells her styles where to link on GitHub Pages
  plugins: [
    tanstackStart({
      prerender: {
        enabled: true, // Forces the framework to generate static files instead of server code
      },
    }),
  ],
  build: {
    outDir: "docs", // Automatically outputs everything to her docs folder
  },
});