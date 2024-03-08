import path from 'path';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dts from "vite-plugin-dts";

import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/lib/index.tsx"),
        name: "index",
        fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
        output: {
          globals: {
            react: "React",
          },
        },
    },
    commonjsOptions: {
      esmExternals: ["react"],
    },
  },
  plugins: [
    dts(),
    cssInjectedByJsPlugin({topExecutionPriority: false})
  ],
})
