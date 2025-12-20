export const getWebVersion = () => {
	return typeof __APP_VERSION__ !== "undefined" ? __APP_VERSION__ : "unknown";
};
