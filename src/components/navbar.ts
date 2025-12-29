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
		window.addEventListener("popstate", this.handlePathChange);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		window.removeEventListener("popstate", this.handlePathChange);
	}

	private handlePathChange = () => {
		this.currentPath = window.location.pathname as RoutePath;
	};

	private handleNavClick = (href: RoutePath) => {
		this.currentPath = href;
		so.click({ button: "nav", path: href });
	};

	private isActive(href: RoutePath): boolean {
		return this.currentPath === href;
	}

	render() {
		return html`
			<nav>
				<div class="nav-inner">
					<a href="${BASE_PATH}/" class="nav-brand" @click=${() => this.handleNavClick(`${BASE_PATH}/` as RoutePath)}>d-roy.ca</a>
					<div class="nav-links">
						${NAV_LINKS.map(
							(link) => html`
								<a
									href="${link.href}"
									class=${classMap({ active: this.isActive(link.href) })}
									@click=${() => this.handleNavClick(link.href)}
								>${link.label}</a>
							`,
						)}
					</div>
				</div>
			</nav>
		`;
	}
}
