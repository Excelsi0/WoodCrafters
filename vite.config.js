import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import postcssPresetEnv from "postcss-preset-env";
import postcssPixelToRem from "postcss-pxtorem";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                // nested: resolve(__dirname, 'nested/index.html'),
            },
        },
    },
    css: {
        postcss: {
            plugins: [
                postcssPresetEnv(),
                postcssPixelToRem({
                    rootValue: 16,
                    propList: ["*"],
                    selectorBlackList: ["html", "body"],
                }),
            ],
        },
    },
});
