import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { BaseComponent } from "#components/base";

@customElement("landing-page")
export class LandingPage extends BaseComponent {
	render() {
		return html`
			<div class="landing">
				<div class="home-hero">
					<h1 class="home-hero__title">
						<span class="segment segment--first">Dominic</span>
						<span class="segment segment--second">Roy</span>
					</h1>

					<p class="home-hero__description">
						I write software and maintain infrastructure I probably don't need.
					</p>

					<div class="home-hero__meta">
						<span class="home-hero__location">Montreal, Canada</span>
						<span class="home-hero__divider">/</span>
						<span class="home-hero__role">Full Stack Engineer</span>
						<span class="home-hero__divider">/</span>
						<span class="home-hero__role">Tech Writer</span>
					</div>

					<p class="home-hero__mobile-note">Looks better on desktop. My CSS skills have limits.</p>
				</div>
			</div>
		`;
	}
}
