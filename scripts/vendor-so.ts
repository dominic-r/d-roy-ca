/**
 * Vendors the SO client from serviceobservability into src/so/.
 * Falls back to existing vendored files if sources aren't available (e.g., Docker builds).
 *
 * Source discovery:
 * - Set SO_ROOT to point at a serviceobservability checkout, or
 * - Keep serviceobservability as a sibling directory (monorepo layout).
 */

import { mkdir } from "node:fs/promises";
import * as path from "node:path";

const projectRoot = path.resolve(import.meta.dir, "..");
const outDir = path.resolve(projectRoot, "src/so");

const FILES = ["so.ts", "server.ts", "index.ts", "gen/analytics_pb.ts"];
const REQUIRED_SOURCE_FILES = ["so.ts", "server.ts", "index.ts"];

const HEADER = `// @generated - Do not edit. Run \`bun run so:vendor\` to regenerate.
`;

const fileExists = (filePath: string): Promise<boolean> =>
	Bun.file(filePath).exists();

const resolveSoRoot = async (): Promise<string | null> => {
	const candidates = [
		Bun.env.SO_ROOT,
		path.resolve(projectRoot, "..", "serviceobservability"),
		path.resolve(projectRoot, "serviceobservability"),
	].filter((p): p is string => Boolean(p));

	for (const candidate of candidates) {
		const soRoot = path.isAbsolute(candidate)
			? candidate
			: path.resolve(projectRoot, candidate);
		const sourceDir = path.join(soRoot, "client/src");
		const sourcePaths = REQUIRED_SOURCE_FILES.map((f) =>
			path.join(sourceDir, f),
		);
		const versionFile = path.join(soRoot, "client/VERSIONFILE");
		if ((await allExist([...sourcePaths, versionFile])) === true) return soRoot;
	}

	return null;
};

const run = async (cmd: string[], cwd: string): Promise<void> => {
	const proc = Bun.spawn(cmd, { cwd, stdout: "inherit", stderr: "inherit" });
	const code = await proc.exited;
	if (code !== 0) {
		throw new Error(`${cmd.join(" ")} failed (cwd=${cwd}, exit=${code})`);
	}
};

const allExist = async (paths: string[]): Promise<boolean> => {
	const results = await Promise.all(paths.map(fileExists));
	return results.every(Boolean);
};

const vendor = async (soRoot: string): Promise<void> => {
	const soClient = path.join(soRoot, "client");
	const sourceDir = path.join(soClient, "src");

	if (!(await fileExists(path.join(soRoot, "node_modules")))) {
		await run(["bun", "install", "--frozen-lockfile"], soRoot);
	}
	if (!(await fileExists(path.join(soClient, "node_modules")))) {
		await run(["bun", "install", "--frozen-lockfile"], soClient);
	}

	await run(["bun", "run", "gen"], soRoot);

	await mkdir(path.join(outDir, "gen"), { recursive: true });

	await Promise.all(
		FILES.map(async (file) => {
			const source = await Bun.file(path.join(sourceDir, file)).text();
			await Bun.write(path.join(outDir, file), HEADER + source);
		}),
	);

	const version = await Bun.file(path.join(soClient, "VERSIONFILE")).text();
	await Bun.write(
		path.join(outDir, "version.ts"),
		`${HEADER}export const SO_VERSION = ${JSON.stringify(version.trim())};\n`,
	);
};

const outPaths = [...FILES, "version.ts"].map((f) => path.join(outDir, f));

const soRoot = await resolveSoRoot();

if (soRoot) {
	await vendor(soRoot);
} else if (await allExist(outPaths)) {
	// Already vendored, nothing to do
} else {
	throw new Error(
		"SO sources missing. Provide serviceobservability sources (set SO_ROOT, or have a sibling ../serviceobservability), or commit pre-vendored d-roy-ca/src/so outputs.",
	);
}
