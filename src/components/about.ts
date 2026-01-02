import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { BaseComponent } from "#components/base";

const HOBBIES = [
	{
		name: "Music",
		description: "Classic rock, metal, prog. Yngwie to Floyd. Loud and often.",
	},
	{
		name: "Politics",
		description:
			"Quebec sovereignty, global affairs, political economy. Always reading, always arguing.",
	},
	{
		name: "Economy",
		description:
			"Markets, trade policy, monetary systems. How the world actually runs.",
	},
	{
		name: "Technology",
		description:
			"Building software, maintaining infrastructure I probably don't need.",
	},
	{
		name: "Cinema",
		description:
			"Tarantino, Kubrick, Villeneuve. Cold war spy films. Preferably on a big screen.",
	},
	{
		name: "History",
		description:
			"The 20th century. World wars, cold war espionage, revolutions, decolonization.",
	},
	{
		name: "Reading",
		description:
			"Political theory, cold war thrillers, spy novels, dystopias. Le Carré and Orwell on repeat.",
	},
];

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
