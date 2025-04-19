import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import postcssPresetEnv from "postcss-preset-env";
import postcssPixelToRem from "postcss-pxtorem";
import { execSync } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    base: "./",
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
            },
        },
        assetsDir: "assets",
        emptyOutDir: true,
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
    plugins: [
        {
            name: "copy-files",
            closeBundle() {
                try {
                    // Копируем send.php из src в dist
                    execSync("cp src/send.php dist/");
                    // Копируем .env из корня в dist
                    execSync("cp .env dist/");
                    console.log("Файлы успешно скопированы в dist");
                } catch (error) {
                    console.error("Ошибка при копировании файлов:", error);
                }
            },
        },
    ],
});
