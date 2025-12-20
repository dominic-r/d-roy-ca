import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { BaseComponent } from "#components/base";

@customElement("app-footer")
export class AppFooter extends BaseComponent {
	render() {
		return html`
			<footer class="footer">
				<p>Made with <span class="heart" aria-label="love"></span> from Canada · v${__APP_VERSION__}</p>
			</footer>
		`;
	}
}
