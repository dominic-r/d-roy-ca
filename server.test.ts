import { describe, expect, it } from "bun:test";
import { createFetchHandler } from "./server";

const joinFsPath = (...parts: string[]): string => {
	let out = parts[0]?.replaceAll("\\", "/") ?? "";
	out = out.replace(/\/+$/g, "");
	for (const raw of parts.slice(1)) {
		const part = raw.replaceAll("\\", "/").replace(/^\/+|\/+$/g, "");
		out = `${out}/${part}`;
	}
	return out;
};

const fixtureDistRoot = joinFsPath(
	import.meta.dir,
	"test",
	"fixtures",
	"pub",
	"site",
);

describe("server", () => {
	it("redirects / to /pub/site/", async () => {
		const fetch = createFetchHandler({ distRoot: fixtureDistRoot });
		const res = await fetch(new Request("http://example.local/"));
		expect(res.status).toBe(302);
		expect(res.headers.get("location")).toBe("/pub/site/");
	});

	it("redirects /pub/site to /pub/site/", async () => {
		const fetch = createFetchHandler({ distRoot: fixtureDistRoot });
		const res = await fetch(new Request("http://example.local/pub/site"));
		expect(res.status).toBe(302);
		expect(res.headers.get("location")).toBe("/pub/site/");
	});

	it("responds to health checks", async () => {
		const fetch = createFetchHandler({ distRoot: fixtureDistRoot });
		const res = await fetch(new Request("http://example.local/api/health"));
		expect(res.status).toBe(200);
		expect(await res.text()).toBe("ok\n");
	});

	it("serves index.html under /pub/site/", async () => {
		const fetch = createFetchHandler({ distRoot: fixtureDistRoot });
		const res = await fetch(new Request("http://example.local/pub/site/"));
		expect(res.status).toBe(200);
		expect(res.headers.get("content-type")).toContain("text/html");
		expect(res.headers.get("cache-control")).toContain("no-cache");
	});

	it("supports HEAD requests for index.html", async () => {
		const fetch = createFetchHandler({ distRoot: fixtureDistRoot });
		const res = await fetch(
			new Request("http://example.local/pub/site/", { method: "HEAD" }),
		);
		expect(res.status).toBe(200);
	});

	it("serves assets with immutable caching", async () => {
		const fetch = createFetchHandler({ distRoot: fixtureDistRoot });
		const res = await fetch(
			new Request("http://example.local/pub/site/assets/app.js"),
		);
		expect(res.status).toBe(200);
		expect(res.headers.get("cache-control")).toContain("immutable");
		expect(res.headers.get("content-type")).toContain("text/javascript");
	});

	it("returns 404 for missing assets", async () => {
		const fetch = createFetchHandler({ distRoot: fixtureDistRoot });
		const res = await fetch(
			new Request("http://example.local/pub/site/assets/missing.js"),
		);
		expect(res.status).toBe(404);
	});

	it("returns index.html for unknown routes under /pub/site/", async () => {
		const fetch = createFetchHandler({ distRoot: fixtureDistRoot });
		const res = await fetch(
			new Request("http://example.local/pub/site/authentik"),
		);
		expect(res.status).toBe(200);
		expect(res.headers.get("content-type")).toContain("text/html");
	});

	it("returns index.html for unknown routes with a querystring", async () => {
		const fetch = createFetchHandler({ distRoot: fixtureDistRoot });
		const res = await fetch(
			new Request("http://example.local/pub/site/authentik?x=y"),
		);
		expect(res.status).toBe(200);
		expect(res.headers.get("content-type")).toContain("text/html");
	});

	it("does not treat querystrings as traversal", async () => {
		const fetch = createFetchHandler({ distRoot: fixtureDistRoot });
		const res = await fetch(
			new Request("http://example.local/pub/site/authentik?x=%2f"),
		);
		expect(res.status).toBe(200);
	});

	it("does not SPA-fallback for non-GET/HEAD", async () => {
		const fetch = createFetchHandler({ distRoot: fixtureDistRoot });
		const res = await fetch(
			new Request("http://example.local/pub/site/authentik", {
				method: "POST",
			}),
		);
		expect(res.status).toBe(404);
	});

	it("returns 404 outside of /pub/site", async () => {
		const fetch = createFetchHandler({ distRoot: fixtureDistRoot });
		const res = await fetch(new Request("http://example.local/nope"));
		expect(res.status).toBe(404);
	});

	it("returns 204 for GET /pub/api-so/v1/c", async () => {
		const fetch = createFetchHandler({ distRoot: fixtureDistRoot });
		const res = await fetch(
			new Request("http://example.local/pub/api-so/v1/c"),
		);
		expect(res.status).toBe(204);
	});

	it("returns 204 for POST /pub/api-so/v1/c even if upstream fails", async () => {
		const fetch = createFetchHandler({
			distRoot: fixtureDistRoot,
			so: {
				prodEndpoint: "http://127.0.0.1:9/v1/collect",
				logErrors: false,
			},
		});
		const res = await fetch(
			new Request("http://example.local/pub/api-so/v1/c", {
				method: "POST",
				body: new Uint8Array([1, 2, 3]),
			}),
		);
		expect(res.status).toBe(204);
	});

	it("blocks path traversal", async () => {
		const fetch = createFetchHandler({ distRoot: fixtureDistRoot });
		const res = await fetch(
			new Request("http://example.local/pub/site/../secret"),
		);
		expect(res.status).toBe(404);
	});

	it("blocks encoded traversal", async () => {
		const fetch = createFetchHandler({ distRoot: fixtureDistRoot });
		const res = await fetch(
			new Request("http://example.local/pub/site/%2e%2e%2fsecret"),
		);
		expect(res.status).toBe(403);
	});

	it("blocks encoded backslashes", async () => {
		const fetch = createFetchHandler({ distRoot: fixtureDistRoot });
		const res = await fetch(
			new Request("http://example.local/pub/site/%5c..%5csecret"),
		);
		expect(res.status).toBe(403);
	});

	it("blocks encoded slashes in /pub/site paths", async () => {
		const fetch = createFetchHandler({ distRoot: fixtureDistRoot });
		const res = await fetch(
			new Request("http://example.local/pub/site/assets%2fapp.js"),
		);
		expect(res.status).toBe(403);
	});
});
