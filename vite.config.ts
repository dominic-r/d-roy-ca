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
		modulePreload: {
			polyfill: false,
		},
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("@bufbuild/protobuf")) return "protobuf";
					if (id.includes("lit") || id.includes("@lit-labs")) return "lit";
					if (id.includes("constants/library")) return "library-data";
				},
			},
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				// @ts-expect-error - modern sass api
				api: "modern-compiler",
			},
		},
	},
});
