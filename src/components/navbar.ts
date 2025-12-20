import { html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { so } from "#app";
import { BaseComponent } from "#components/base";
import { BASE_PATH, NAV_LINKS, type RoutePath } from "#constants/routes";

@customElement("nav-bar")
export class NavBar extends BaseComponent {
	@state()
	private currentPath: RoutePath = window.location.pathname as RoutePath;

	connectedCallback() {
		super.connectedCallback();
		window.addEventListener("popstate", this.handleNavigation);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		window.removeEventListener("popstate", this.handleNavigation);
	}

	private handleNavigation = () => {
		this.currentPath = window.location.pathname as RoutePath;
		so.click({ button: "nav", path: this.currentPath });
	};

	private isActive(href: RoutePath): boolean {
		return this.currentPath === href;
	}

	render() {
		return html`
			<nav class="navbar" role="navigation" aria-label="Main navigation">
				<div class="nav-container">
					<a href="${BASE_PATH}/" class="nav-brand">d-roy.ca</a>
					<div class="nav-links" role="menubar">
						${NAV_LINKS.map(
							(link) => html`
								<a
									href="${link.href}"
									role="menuitem"
									class=${classMap({ active: this.isActive(link.href) })}
									aria-current=${this.isActive(link.href) ? "page" : "false"}
									@click=${this.handleNavigation}
								>${link.label}</a>
							`,
						)}
					</div>
				</div>
			</nav>
		`;
	}
}
