import { createSOHandler, type SOServerConfig } from "#so";

export type AppConfig = {
	distRoot?: string;
	so?: SOServerConfig;
};

const defaultDistRoot = (): string =>
	process.env.DIST_ROOT ?? `${process.cwd()}/dist/pub/site`;

const extname = (path: string): string => {
	const lastSlash = path.lastIndexOf("/");
	const lastDot = path.lastIndexOf(".");
	if (lastDot === -1 || lastDot < lastSlash) return "";
	return path.slice(lastDot);
};

const joinPosix = (root: string, rel: string): string => {
	const normalizedRoot = root.endsWith("/") ? root.slice(0, -1) : root;
	const normalizedRel = rel.startsWith("/") ? rel.slice(1) : rel;
	return `${normalizedRoot}/${normalizedRel}`;
};

/**
 * Safely join root with a relative path.
 * Returns null if the path contains traversal sequences or invalid chars.
 */
const safeJoin = (root: string, rel: string): string | null => {
	if (rel.includes("\0")) return null;
	const segments = rel
		.replace(/^\/+/, "")
		.split("/")
		.filter((s) => s.length > 0);
	for (const seg of segments) {
		if (seg === "." || seg === ".." || seg.includes("\\") || seg.includes(":"))
			return null;
	}
	return joinPosix(root, segments.join("/"));
};

/** Extract pathname from URL and stripping query and hash. */
const rawPathname = (rawUrl: string): string => {
	const strip = (path: string): string => {
		const query = path.indexOf("?");
		const hash = path.indexOf("#");
		const end =
			query === -1 ? hash : hash === -1 ? query : Math.min(query, hash);
		return end === -1 ? path : path.slice(0, end);
	};

	if (rawUrl.startsWith("/")) return strip(rawUrl);
	const scheme = rawUrl.indexOf("://");
	if (scheme === -1) return strip(rawUrl);
	const slash = rawUrl.indexOf("/", scheme + 3);
	return slash === -1 ? "/" : strip(rawUrl.slice(slash));
};

const MIME_TYPES: Record<string, string> = {
	".html": "text/html; charset=utf-8",
	".js": "text/javascript; charset=utf-8",
	".css": "text/css; charset=utf-8",
	".svg": "image/svg+xml",
	".json": "application/json; charset=utf-8",
};

const mimeType = (path: string): string =>
	MIME_TYPES[extname(path).toLowerCase()] ?? "application/octet-stream";

const redirect = (to: string, status = 302): Response =>
	new Response(null, { status, headers: { Location: to } });

const forbidden = (): Response => new Response("forbidden\n", { status: 403 });
const notFound = (): Response => new Response("not found\n", { status: 404 });

/** Serve a static file with caching headers. */
const serveFile = async (absolutePath: string): Promise<Response | null> => {
	const file = Bun.file(absolutePath);
	if (!(await file.exists())) return null;

	const headers = new Headers();
	headers.set("Content-Type", mimeType(absolutePath));

	if (absolutePath.endsWith("/index.html")) {
		headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
	} else if (absolutePath.includes("/assets/")) {
		headers.set("Cache-Control", "public, immutable, max-age=31536000");
	}

	return new Response(file, { headers });
};

/** Serve index.html for SPA fallback. */
const serveSpa = (indexPath: string): Response =>
	new Response(Bun.file(indexPath), {
		headers: {
			"Content-Type": "text/html; charset=utf-8",
			"Cache-Control": "no-cache, no-store, must-revalidate",
		},
	});

export const createFetchHandler = (config: AppConfig = {}) => {
	const distRoot = config.distRoot ?? defaultDistRoot();
	const indexPath = joinPosix(distRoot, "index.html");
	const soHandler = createSOHandler(config.so);

	return async (req: Request): Promise<Response> => {
		const rawPath = rawPathname(req.url).toLowerCase();
		if (
			rawPath.startsWith("/pub/site/") &&
			(rawPath.includes("%2f") || rawPath.includes("%5c"))
		) {
			return forbidden();
		}

		const { pathname } = new URL(req.url);

		if (pathname === "/") return redirect("/pub/site/");
		if (pathname === "/pub/site") return redirect("/pub/site/");

		const soResponse = await soHandler(req);
		if (soResponse) return soResponse;

		if (pathname === "/api/health") return new Response("ok\n");

		if (pathname === "/pub/site/" || pathname.startsWith("/pub/site/")) {
			const rel = pathname.slice("/pub/site/".length);
			const filePath = safeJoin(distRoot, rel || "index.html");
			if (!filePath) return forbidden();

			const fileResponse = await serveFile(filePath);
			if (fileResponse) return fileResponse;

			if (pathname.startsWith("/pub/site/assets/")) return notFound();
			if (req.method !== "GET" && req.method !== "HEAD") return notFound();

			return serveSpa(indexPath);
		}

		return notFound();
	};
};

if (import.meta.main) {
	const hostname = process.env.HOST ?? "0.0.0.0";
	const port = Number.parseInt(process.env.PORT ?? "3000", 10);
	const handler = createFetchHandler();
	const logRequests = process.env.LOG_REQUESTS !== "0";

	Bun.serve({
		hostname,
		port,
		fetch: async (req, server) => {
			const start = performance.now();
			const res = await handler(req);

			if (logRequests) {
				const url = new URL(req.url);
				const ip = server.requestIP(req)?.address ?? "-";
				const ms = Math.round(performance.now() - start);
				console.log(
					`${ip} ${req.method} ${url.pathname}${url.search} ${res.status} ${ms}ms`,
				);
			}

			return res;
		},
	});

	const publicHost = hostname === "0.0.0.0" ? "localhost" : hostname;
	console.log(
		`Listening on http://${publicHost}:${port} (bound to ${hostname})`,
	);
}
