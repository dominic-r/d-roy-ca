import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { BaseComponent } from "#components/base";

@customElement("about-page")
export class AboutPage extends BaseComponent {
	render() {
		return html`
			<div class="page">
				<h1>About</h1>
				<p class="dim">Coming soon...</p>
			</div>
		`;
	}
}
