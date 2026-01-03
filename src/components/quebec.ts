import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { BaseComponent } from "#components/base";

@customElement("quebec-page")
export class QuebecPage extends BaseComponent {
	render() {
		return html`
			<div class="page quebec-page">
				<header class="quebec-header">
					<svg class="quebec-header__watermark" viewBox="0 0 219 299" fill="currentColor"><path d="m 182.76,203.56 c 4.8,-7.15 4.4,-22.8 -5.21,-28.32 -7.35,-3.67 -15.65,-2.24 -19.53,0.93 -6.24,3.78 -12.26,15.85 -12.26,28.08 l 21.56,-0.03 -0.01,24.08 -44.75,-0.02 c 0.59,12.38 7.34,22.3 19.9,27.82 -1.62,5.22 -9.19,15.86 -19.6,15.14 -2.05,11.25 -4.01,17.57 -13.36,27.8 -9.36,-10.22 -11.32,-16.55 -13.37,-27.8 -10.41,0.72 -17.98,-9.92 -19.6,-15.14 12.56,-5.52 19.32,-15.44 19.9,-27.82 l -44.75,0.02 v -24.08 l 21.55,0.03 c 0,-12.23 -6,-24.31 -12.25,-28.08 -3.88,-3.17 -12.18,-4.6 -19.52,-0.93 -9.62,5.52 -10.03,21.17 -5.22,28.32 -45.4,-8.43 -40.9,-52.28 -25.43,-68.2 12.5,-12.86 26.13,-14.87 36.63,-10.81 23.88,8.56 39.94,37.09 40.72,79.7 h 12.49 c 0,-38.74 -6.74,-51.09 -24.3,-99.74 C 67.51,81.52 72.82,53.09 88.63,26.92 94.3,17.54 101.37,9.07 109.5,0 c 8.13,9.07 15.2,17.54 20.86,26.92 15.82,26.17 21.13,54.6 12.29,77.59 -17.57,48.65 -24.31,61 -24.31,99.74 h 12.49 c 0.78,-42.61 16.85,-71.14 40.72,-79.7 10.51,-4.05 24.14,-2.05 36.64,10.81 15.46,15.92 19.96,59.76 -25.43,68.2 z"/></svg>
					<h1 class="quebec-header__title">
						<span class="quebec-header__line">Maîtres</span>
						<span class="quebec-header__line quebec-header__line--outline">chez</span>
						<span class="quebec-header__line">nous</span>
					</h1>
					<p class="quebec-header__subtitle">Masters in our own house</p>
					<div class="quebec-header__scroll">
						<span>Scroll</span>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M12 5v14M5 12l7 7 7-7"/>
						</svg>
					</div>
				</header>

				<section class="quebec-intro">
					<div class="quebec-intro__content">
						<p class="quebec-intro__lead">
							Quebec is a nation with its own language, culture, legal system, and identity. 
							Sovereignty is the natural next step.
						</p>
					</div>
				</section>

				<section class="quebec-section">
					<h2 class="quebec-section__title">Why Independence?</h2>
					<div class="quebec-points">
						<article class="quebec-point">
							<span class="quebec-point__number">01</span>
							<h3 class="quebec-point__title">Cultural Preservation</h3>
							<p class="quebec-point__text">
								French is a worldview. Surrounded by 360 million English speakers, 
								Quebec's 8 million francophones need the full powers of a nation-state to protect their linguistic heritage.
							</p>
						</article>
						<article class="quebec-point">
							<span class="quebec-point__number">02</span>
							<h3 class="quebec-point__title">Democratic Self-Determination</h3>
							<p class="quebec-point__text">
								Quebecers consistently vote differently than the rest of Canada. Our values on secularism, 
								social programs, and environmental policy deserve a government that fully represents them.
							</p>
						</article>
						<article class="quebec-point">
							<span class="quebec-point__number">03</span>
							<h3 class="quebec-point__title">Economic Control</h3>
							<p class="quebec-point__text">
								Quebec sends billions to Ottawa annually. An independent Quebec would control its own taxes, 
								trade deals, and economic destiny, investing in priorities that matter to Quebecers.
							</p>
						</article>
						<article class="quebec-point">
							<span class="quebec-point__number">04</span>
							<h3 class="quebec-point__title">A Distinct Legal Tradition</h3>
							<p class="quebec-point__text">
								Quebec already operates under civil law while the rest of Canada uses common law. 
								Independence would formalize what already exists.
							</p>
						</article>
					</div>
				</section>

				<section class="quebec-quote">
					<blockquote>
						<p>"Le Québec a tous les attributs d'une nation. Il ne lui manque que la souveraineté. Un peuple, une nation, un pays doit avoir un gouvernement, un vrai."</p>
						<cite>
							<span class="quebec-quote__author">Jacques Parizeau</span>
							<span class="quebec-quote__source">Pour un Québec souverain</span>
							<span class="quebec-quote__year">1997</span>
						</cite>
					</blockquote>
				</section>

				<section class="quebec-section">
					<h2 class="quebec-section__title">The History</h2>
					<div class="quebec-timeline">
						<div class="quebec-timeline__item">
							<span class="quebec-timeline__year">1960</span>
							<p class="quebec-timeline__text">The Quiet Revolution begins. Quebec rapidly modernizes and asserts its identity.</p>
						</div>
						<div class="quebec-timeline__item">
							<span class="quebec-timeline__year">1976</span>
							<p class="quebec-timeline__text">Parti Québécois wins power. René Lévesque becomes Premier.</p>
						</div>
						<div class="quebec-timeline__item">
							<span class="quebec-timeline__year">1980</span>
							<p class="quebec-timeline__text">First sovereignty referendum. 40% vote Yes despite federal interference.</p>
						</div>
						<div class="quebec-timeline__item">
							<span class="quebec-timeline__year">1995</span>
							<p class="quebec-timeline__text">Second referendum. 49.42% vote Yes — a margin of just 54,288 votes.</p>
						</div>
						<div class="quebec-timeline__item">
							<span class="quebec-timeline__year">20??</span>
							<p class="quebec-timeline__text">Third time's the charm.</p>
						</div>
					</div>
				</section>

				<footer class="quebec-footer">
					<p class="quebec-footer__text">Je me souviens</p>
					<p class="quebec-footer__subtext">I remember</p>
				</footer>
			</div>
		`;
	}
}
