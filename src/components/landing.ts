import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { BaseComponent } from "#components/base";

@customElement("landing-page")
export class LandingPage extends BaseComponent {
	render() {
		return html`
			<div class="landing">
				<div class="landing-content">
					<h1>Coming Soon</h1>
					<p class="tagline">Under construction</p>
				</div>
			</div>
		`;
	}
}
