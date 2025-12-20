import type { TemplateResult } from "lit";
import { html } from "lit";

export interface AppRoute {
	path: string;
	label: string;
	render: () => TemplateResult;
}

export const BASE_PATH = "/pub/site";
const withBase = (path: string) => `${BASE_PATH}${path}`;

export const ROUTES = {
	HOME: withBase("/"),
	ABOUT: withBase("/about"),
	PROJECTS: withBase("/projects"),
	AUTHENTIK: withBase("/authentik"),
	LIBRARY: withBase("/library"),
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

export const NAV_LINKS: readonly { label: string; href: RoutePath }[] = [
	{ label: "Home", href: ROUTES.HOME },
	{ label: "About", href: ROUTES.ABOUT },
	{ label: "Projects", href: ROUTES.PROJECTS },
	{ label: "authentik", href: ROUTES.AUTHENTIK },
	{ label: "Library", href: ROUTES.LIBRARY },
] as const;

export const APP_ROUTES: readonly AppRoute[] = [
	{
		path: ROUTES.HOME,
		label: "Home",
		render: () => html`<landing-page></landing-page>`,
	},
	{
		path: ROUTES.ABOUT,
		label: "About",
		render: () => html`<about-page></about-page>`,
	},
	{
		path: ROUTES.PROJECTS,
		label: "Projects",
		render: () => html`<projects-page></projects-page>`,
	},
	{
		path: ROUTES.AUTHENTIK,
		label: "authentik",
		render: () => html`<authentik-page></authentik-page>`,
	},
	{
		path: ROUTES.LIBRARY,
		label: "Library",
		render: () => html`<library-page></library-page>`,
	},
] as const;
