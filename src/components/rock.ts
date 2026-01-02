import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { BaseComponent } from "#components/base";
import { ARTWORK } from "#constants/artwork";
import { ALBUMS, COLLECTION_INTRO, DEBATE, ROCK_QUOTE } from "#constants/rock";

@customElement("rock-page")
export class RockPage extends BaseComponent {
	render() {
		return html`
			<div class="page rock-page">
				<header class="rock-header">
					<h1 class="rock-header__title">
						<span class="rock-header__line">Rock</span>
						<span class="rock-header__line rock-header__line--outline">&</span>
						<span class="rock-header__line">Roll</span>
					</h1>
					<blockquote class="rock-header__quote">
						<p>"${ROCK_QUOTE.text}"</p>
						<cite>— ${ROCK_QUOTE.author}</cite>
					</blockquote>
					<div class="rock-header__scroll">
						<span>Scroll</span>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M12 5v14M5 12l7 7 7-7"/>
						</svg>
					</div>
				</header>

				<section class="rock-mood">
					<svg class="rock-mood__cloud rock-mood__cloud--left" viewBox="0 0 64 32" fill="currentColor">
						<path d="M56 24c4.4 0 8-3.6 8-8s-3.6-8-8-8c-.5 0-1 0-1.5.1C53.1 3.8 49 0 44 0c-4.5 0-8.3 3.2-9.2 7.5C33.6 6.6 31.9 6 30 6c-4.4 0-8 3.6-8 8 0 .4 0 .8.1 1.2C19.3 15.7 17 18.1 17 21c0 3.3 2.7 6 6 6h33z"/>
					</svg>
					<p class="rock-mood__text">Currently levitating in Comfortably Numb</p>
					<svg class="rock-mood__cloud rock-mood__cloud--right" viewBox="0 0 48 24" fill="currentColor">
						<path d="M42 18c3.3 0 6-2.7 6-6s-2.7-6-6-6c-.4 0-.7 0-1.1.1C39.8 2.8 36.8 0 33 0c-3.4 0-6.2 2.4-6.9 5.6C25.2 5 24.1 4.5 23 4.5c-3.3 0-6 2.7-6 6 0 .3 0 .6.1.9C15 11.8 13.3 13.6 13 16c0 2.5 2 4.5 4.5 4.5H42z"/>
					</svg>
				</section>

				<section class="rock-section">
					<div class="rock-section__intro">
						<h2 class="rock-section__title">${COLLECTION_INTRO.title}</h2>
						<p class="rock-section__description">${COLLECTION_INTRO.description}</p>
					</div>
					<div class="album-grid">
						${ALBUMS.map(
							(album) => html`
								<article class="album-card">
									<img 
										class="album-card__artwork" 
										src="${ARTWORK[album.artworkKey]}" 
										alt="${album.album}"
										loading="lazy"
									/>
									<div class="album-card__info">
										<h3 class="album-card__title">${album.album}</h3>
										<p class="album-card__artist">${album.artist}</p>
										<span class="album-card__year">${album.year}</span>
									</div>
								</article>
							`,
						)}
					</div>
				</section>

				<section class="rock-debates">
					<div class="rock-debate">
						<p class="rock-debate__question">${DEBATE.question}</p>
						<div class="rock-debate__options">
							<span class="rock-debate__option">${DEBATE.options[0]}</span>
							<span class="rock-debate__vs">or</span>
							<span class="rock-debate__option">${DEBATE.options[1]}</span>
						</div>
					</div>
				</section>

				<footer class="rock-footer">
					<p>Music is just organized air. But some air hits different.</p>
				</footer>
			</div>
		`;
	}
}
