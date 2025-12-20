const PERF_BAR_ID = "sdko-perf-bar";

type PerfBarMode = "enable" | "disable" | "toggle";

interface PerfMetrics {
	loadTimeMs?: number;
	dclTimeMs?: number;
	fcpTimeMs?: number;
	transferKb?: number;
}

let refreshIntervalId: number | null = null;

const formatMs = (value?: number) =>
	value != null ? `${Math.round(value)}ms` : "n/a";
const formatKb = (value?: number) =>
	value != null ? `${(value / 1024).toFixed(1)} KB` : "n/a";

const readNavigationTiming = (): PerfMetrics => {
	const nav = performance.getEntriesByType("navigation")[0] as
		| PerformanceNavigationTiming
		| undefined;
	if (nav) {
		return {
			loadTimeMs: nav.duration,
			dclTimeMs: nav.domContentLoadedEventEnd - nav.startTime,
			fcpTimeMs: performance.getEntriesByName("first-contentful-paint")[0]
				?.startTime,
			transferKb: nav.transferSize || undefined,
		};
	}

	const legacy = performance.timing;
	return {
		loadTimeMs: legacy.loadEventEnd - legacy.navigationStart,
		dclTimeMs: legacy.domContentLoadedEventEnd - legacy.navigationStart,
		fcpTimeMs: performance.getEntriesByName("first-contentful-paint")[0]
			?.startTime,
		transferKb: undefined,
	};
};

const ensureBar = () => {
	let bar = document.getElementById(PERF_BAR_ID);
	if (!bar) {
		bar = document.createElement("div");
		bar.id = PERF_BAR_ID;
		bar.setAttribute("aria-live", "polite");
		bar.style.position = "fixed";
		bar.style.top = "0";
		bar.style.left = "0";
		bar.style.right = "0";
		bar.style.zIndex = "2147483647";
		bar.style.background = "linear-gradient(90deg, #111827, #0b1221)";
		bar.style.color = "#f9fafb";
		bar.style.fontFamily = "Menlo, Consolas, Monaco, monospace";
		bar.style.fontSize = "12px";
		bar.style.lineHeight = "1.5";
		bar.style.display = "flex";
		bar.style.alignItems = "center";
		bar.style.gap = "12px";
		bar.style.padding = "6px 10px";
		bar.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.35)";
		bar.style.pointerEvents = "auto";
		document.body.appendChild(bar);
	}
	return bar;
};

const renderMetrics = (bar: HTMLElement, metrics: PerfMetrics) => {
	const items: { label: string; value: string; title: string }[] = [
		{
			label: "load",
			value: formatMs(metrics.loadTimeMs),
			title: "Time until load event",
		},
		{
			label: "dcl",
			value: formatMs(metrics.dclTimeMs),
			title: "DOMContentLoaded timing",
		},
		{
			label: "fcp",
			value: formatMs(metrics.fcpTimeMs),
			title: "First Contentful Paint",
		},
		{
			label: "transfer",
			value: formatKb(metrics.transferKb),
			title: "Transfer size of navigation",
		},
	];

	bar.textContent = "";

	const prefix = document.createElement("span");
	prefix.textContent = "perf |";
	bar.appendChild(prefix);

	for (const item of items) {
		const span = document.createElement("span");
		span.title = item.title;
		span.textContent = `${item.label}: ${item.value}`;
		bar.appendChild(span);
	}
};

const removeBar = () => {
	const existing = document.getElementById(PERF_BAR_ID);
	if (existing?.parentElement) {
		existing.parentElement.removeChild(existing);
	}
};

const stopPerfLoop = () => {
	if (refreshIntervalId !== null) {
		window.clearInterval(refreshIntervalId);
		refreshIntervalId = null;
	}
};

const startPerfLoop = (bar: HTMLElement) => {
	stopPerfLoop();
	const render = () => {
		const metrics = readNavigationTiming();
		renderMetrics(bar, metrics);
	};
	render();
	refreshIntervalId = window.setInterval(render, 2000);
};

export const perfBar = (mode: PerfBarMode = "toggle") => {
	if (typeof window === "undefined" || typeof document === "undefined")
		return null;

	if (mode === "disable") {
		stopPerfLoop();
		removeBar();
		return null;
	}

	if (mode === "toggle") {
		const existing = document.getElementById(PERF_BAR_ID);
		if (existing) {
			stopPerfLoop();
			removeBar();
			return null;
		}
	}

	const bar = ensureBar();
	startPerfLoop(bar);
	return readNavigationTiming();
};
