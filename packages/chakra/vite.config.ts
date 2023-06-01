/// <reference types="vitest" />
import { joinPathFragments } from "@nx/devkit";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  cacheDir: "../../node_modules/.vite/chakra",
  plugins: [
    dts({
      entryRoot: "src",
      tsConfigFilePath: joinPathFragments(__dirname, "tsconfig.lib.json"),
      skipDiagnostics: true,
    }),
    react(),
    viteTsConfigPaths({
      root: "../../",
    }),
  ],
  build: {
    ssr: true,
    lib: {
      name: "chakra",
      entry: {
        index: "src/index.ts",
        theme: "src/theme/index.ts",
        components: "src/components/index.ts",
      },
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
  },
});
