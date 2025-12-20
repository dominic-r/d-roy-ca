import { consoleHello } from "#console/commands/consoleHello";
import { getWebVersion } from "#console/commands/getWebVersion";
import { type ListSource, listObjects } from "#console/commands/listObjects";
import { perfBar } from "#console/commands/perfBar";
import { setupDevtoolsHello } from "#console/utils/devtoolsHello";

interface SdkoConsole {
	listObjects: (source?: ListSource) => unknown;
	getWebVersion: () => string;
	consoleHello: () => string;
	perfBar: () => unknown;
}

const sdko: SdkoConsole = {
	listObjects,
	getWebVersion,
	consoleHello,
	perfBar,
};

declare global {
	interface Window {
		_sdko: SdkoConsole;
	}
}

if (typeof window !== "undefined") {
	window._sdko = sdko;
	const teardownHello = setupDevtoolsHello();

	// cleanup on page unload
	window.addEventListener("beforeunload", () => {
		teardownHello();
	});
}
