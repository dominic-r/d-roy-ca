import type { AboutPage } from "#components/about";
import type { AuthentikPage } from "#components/authentik";
import type { AppFooter } from "#components/footer";
import type { LandingPage } from "#components/landing";
import type { LibraryPage } from "#components/library";
import type { NavBar } from "#components/navbar";
import type { ProjectsPage } from "#components/projects";
import type { RockPage } from "#components/rock";
import type { AppRoot } from "../app";

declare global {
	interface HTMLElementTagNameMap {
		"app-root": AppRoot;
		"nav-bar": NavBar;
		"app-footer": AppFooter;
		"landing-page": LandingPage;
		"about-page": AboutPage;
		"projects-page": ProjectsPage;
		"authentik-page": AuthentikPage;
		"library-page": LibraryPage;
		"rock-page": RockPage;
	}

	const __APP_VERSION__: string;
}

export interface Contribution {
	text: string;
	isWip: boolean;
}
