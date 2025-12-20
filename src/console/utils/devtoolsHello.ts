import { consoleHello } from "#console/commands/consoleHello";

export const setupDevtoolsHello = () => {
	if (typeof window === "undefined") return () => {};

	let devtoolsOpen = false;
	const threshold = 160;

	const checkDevtools = () => {
		const widthGap = window.outerWidth - window.innerWidth > threshold;
		const heightGap = window.outerHeight - window.innerHeight > threshold;
		const opened = widthGap || heightGap;

		if (opened && !devtoolsOpen) {
			devtoolsOpen = true;
			consoleHello();
		} else if (!opened) {
			devtoolsOpen = false;
		}
	};

	window.addEventListener("resize", checkDevtools);
	const intervalId = window.setInterval(checkDevtools, 1000);

	checkDevtools();

	return () => {
		window.removeEventListener("resize", checkDevtools);
		window.clearInterval(intervalId);
	};
};
