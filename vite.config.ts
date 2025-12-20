import { readFileSync } from "node:fs";
import { defineConfig } from "vite";

const version = readFileSync("./VERSIONFILE", "utf-8").trim();

export default defineConfig({
	base: "/pub/site/",
	define: {
		__APP_VERSION__: JSON.stringify(version),
	},
	build: {
		outDir: "dist/pub/site",
		target: "ES2022",
		rollupOptions: {
			output: {
				manualChunks: {
					lit: ["lit", "@lit-labs/router"],
				},
			},
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: "modern-compiler",
			},
		},
	},
});
