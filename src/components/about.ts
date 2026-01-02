import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { BaseComponent } from "#components/base";
import { HOBBIES } from "#constants/about";

@customElement("about-page")
export class AboutPage extends BaseComponent {
	render() {
		return html`
			<div class="page about-page">
				<header class="about-header">
					<h1 class="about-header__title">About</h1>
					<p class="about-header__subtitle">The short version</p>
				</header>

				<section class="about-section">
					<h2 class="about-section__title">Who</h2>
					<p class="about-section__text dim">Coming soon...</p>
				</section>

				<section class="about-section">
					<h2 class="about-section__title">What I Do</h2>
					<p class="about-section__text dim">Coming soon...</p>
				</section>

				<section class="about-section">
					<h2 class="about-section__title">Interests</h2>
					<div class="hobbies-grid">
						${HOBBIES.map(
							(hobby) => html`
								<article class="hobby-card">
									<h3 class="hobby-card__name">${hobby.name}</h3>
									<p class="hobby-card__description">${hobby.description}</p>
								</article>
							`,
						)}
					</div>
				</section>

				<section class="about-section">
					<h2 class="about-section__title">Contact</h2>
					<p class="about-section__text dim">Coming soon...</p>
				</section>
			</div>
		`;
	}
}
