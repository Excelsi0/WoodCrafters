import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import postcssPresetEnv from "postcss-preset-env";
import postcssPixelToRem from "postcss-pxtorem";
import { execSync } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    base: "/",
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                about: resolve(__dirname, "about.html"),
                gallery: resolve(__dirname, "gallery.html"),
                contacts: resolve(__dirname, "contacts.html"),
            },
        },
        assetsDir: "assets",
        emptyOutDir: true,
        outDir: "dist",
    },
    server: {
        proxy: {
            "/php/send.php": {
                target: "http://localhost:8000",
                changeOrigin: true,
            },
        },
    },
    css: {
        devSourcemap: true,
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
                    execSync("mkdir -p dist/php");
                    execSync("cp src/send.php dist/php/");
                    execSync("cp phone_validation.php dist/php/");
                    execSync("cp .env dist/php/");
                    console.log("Файлы успешно скопированы в dist");
                } catch (error) {
                    console.error("Ошибка при копировании файлов:", error);
                }
            },
        },
        {
            name: "handle-html-urls",
            configureServer({ middlewares }) {
                middlewares.use((req, res, next) => {
                    if (req.url === "/") {
                        req.url = "/index.html";
                    } else if (!req.url.includes(".")) {
                        req.url = req.url + ".html";
                    }
                    next();
                });
            },
        },
    ],
});
