import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { BaseComponent } from "#components/base";

@customElement("projects-page")
export class ProjectsPage extends BaseComponent {
	render() {
		return html`
			<div class="page">
				<div class="container">
					<h1>Projects</h1>
					<p class="text-secondary">Coming soon...</p>
				</div>
			</div>
		`;
	}
}
