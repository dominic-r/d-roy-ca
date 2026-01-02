/**
 * Downloads album artwork from MusicBrainz Cover Art Archive at build time.
 * Reads album list from src/constants/rock.ts and downloads to public/albums/
 *
 * Usage: bun scripts/fetch-album-art.ts
 */

import { mkdir, readdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { ALBUMS } from "../src/constants/rock";

const UA = "d-roy-ca/1.0";
const OUT_DIR = join(import.meta.dir, "..", "src", "assets", "albums");

async function download() {
	await mkdir(OUT_DIR, { recursive: true });

	// Build set of expected filenames
	const expectedFiles = new Set(ALBUMS.map((a) => `${a.artworkKey}.jpg`));

	// Remove stale files not in current album list
	try {
		const existing = await readdir(OUT_DIR);
		for (const file of existing) {
			if (!expectedFiles.has(file)) {
				await rm(join(OUT_DIR, file));
				console.log(`Removed stale: ${file}`);
			}
		}
	} catch {
		// Directory doesn't exist yet, that's fine
	}

	console.log(`Downloading album artwork to ${OUT_DIR}\n`);

	let success = 0;
	let failed = 0;

	for (const album of ALBUMS) {
		const key = album.artworkKey;
		const mbid = album.mbid;
		const outPath = join(OUT_DIR, `${key}.jpg`);

		try {
			// Get metadata to find thumb filename
			const metaRes = await fetch(`https://archive.org/metadata/mbid-${mbid}`, {
				headers: { "User-Agent": UA },
			});

			if (!metaRes.ok) {
				console.log(`✗ ${key}: metadata fetch failed`);
				failed++;
				continue;
			}

			const meta = (await metaRes.json()) as { files?: { name: string }[] };
			const thumb = meta.files?.find((f) => f.name.endsWith("_thumb250.jpg"));

			if (!thumb) {
				console.log(`✗ ${key}: no thumbnail found`);
				failed++;
				continue;
			}

			// Download image
			const imageUrl = `https://archive.org/download/mbid-${mbid}/${thumb.name}`;
			const imageRes = await fetch(imageUrl, { headers: { "User-Agent": UA } });

			if (!imageRes.ok) {
				console.log(`✗ ${key}: image download failed`);
				failed++;
				continue;
			}

			await Bun.write(outPath, await imageRes.arrayBuffer());
			console.log(`✓ ${key}`);
			success++;
		} catch (err) {
			console.log(`✗ ${key}: ${err}`);
			failed++;
		}
	}

	console.log(`\nDone: ${success} downloaded, ${failed} failed`);

	if (failed > 0) process.exit(1);
}

download();
