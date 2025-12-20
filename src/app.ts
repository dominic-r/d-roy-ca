import "urlpattern-polyfill";
import { SO } from "#so";
import "#types";
import "#console";

declare const __APP_VERSION__: string;

export const so = new SO("d-roy-ca", __APP_VERSION__);
so.pageview();
window.addEventListener("popstate", () => so.pageview());
import "#components/navbar";
import "#components/footer";
import "#components/landing";
import "#components/about";
import "#components/projects";
import "#components/authentik";
import "#components/library";
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
