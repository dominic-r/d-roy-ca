import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { BaseComponent } from "#components/base";

@customElement("app-footer")
export class AppFooter extends BaseComponent {
	private currentYear = new Date().getFullYear();

	render() {
		return html`
			<footer>
				<div class="footer-links">
					<a href="https://github.com/dominic-r" target="_blank" rel="noopener">GitHub</a>
					<a href="mailto:dominic@sdko.org">Email</a>
				</div>
				<div>
					Made with ❤️ in Canada &middot; ${this.currentYear} Dominic Roy &middot; v${__APP_VERSION__}
				</div>
			</footer>
		`;
	}
}
