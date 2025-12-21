import type { TemplateResult } from "lit";
import { html } from "lit";

export const BASE_PATH = "/pub/site";

const ROUTE_CONFIG = [
	{ key: "HOME", path: "/", label: "Home", render: () => html`<landing-page></landing-page>` },
	{ key: "ABOUT", path: "/about", label: "About", render: () => html`<about-page></about-page>` },
	{ key: "PROJECTS", path: "/projects", label: "Projects", render: () => html`<projects-page></projects-page>` },
	{ key: "AUTHENTIK", path: "/authentik", label: "authentik", render: () => html`<authentik-page></authentik-page>` },
	{ key: "LIBRARY", path: "/library", label: "Library", render: () => html`<library-page></library-page>` },
] as const;

export const ROUTES = Object.fromEntries(
	ROUTE_CONFIG.map((r) => [r.key, `${BASE_PATH}${r.path}`]),
) as { [K in (typeof ROUTE_CONFIG)[number]["key"]]: string };

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

export const NAV_LINKS = ROUTE_CONFIG.map((r) => ({
	label: r.label,
	href: `${BASE_PATH}${r.path}` as RoutePath,
}));

export interface AppRoute {
	path: string;
	label: string;
	render: () => TemplateResult;
}

export const APP_ROUTES: AppRoute[] = ROUTE_CONFIG.map((r) => ({
	path: `${BASE_PATH}${r.path}`,
	label: r.label,
	render: r.render,
}));
