import "urlpattern-polyfill";
import "#types";
import "#console";

declare const __APP_VERSION__: string;

// Lazy-load SO
let _so: import("#so").SO | null = null;

const getSO = async () => {
	if (!_so) {
		const { SO } = await import("#so");
		_so = new SO("d-roy-ca", __APP_VERSION__);
	}
	return _so;
};

// Proxy object for sync access
export const so = {
	pageview: (props?: Record<string, string>) => {
		getSO().then((s) => s.pageview(props));
	},
	click: (props?: Record<string, string>) => {
		getSO().then((s) => s.click(props));
	},
	search: (props?: Record<string, string>) => {
		getSO().then((s) => s.search(props));
	},
	track: (type: string, props?: Record<string, string>) => {
		getSO().then((s) => s.track(type, props));
	},
};

so.pageview();
window.addEventListener("popstate", () => so.pageview());

import "#components/navbar";
import "#components/footer";
import "#components/landing";
import "#components/about";
import "#components/projects";
import "#components/authentik";
import "#components/library";
import "#components/rock";
import "#components/quebec";
import { Router } from "@lit-labs/router";
import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { BaseComponent } from "#components/base";
import { APP_ROUTES, ROUTES } from "#constants/routes";
import faviconUrl from "./assets/favicon.svg?url";

const faviconLink = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
if (faviconLink) {
	faviconLink.href = faviconUrl;
	faviconLink.type = "image/svg+xml";
}

@customElement("app-root")
export class AppRoot extends BaseComponent {
	private router = new Router(
		this,
		APP_ROUTES.map((route) => ({
			path: route.path,
			render: route.render,
		})),
		{
			fallback: {
				render: () =>
					APP_ROUTES.find((r) => r.path === ROUTES.HOME)?.render() ??
					html`<landing-page></landing-page>`,
			},
		},
	);

	render() {
		return html`
			<div class="app-container">
				<nav-bar></nav-bar>
				<main id="outlet">${this.router.outlet()}</main>
				<app-footer></app-footer>
			</div>
		`;
	}
}
