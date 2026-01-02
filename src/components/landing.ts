import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { BaseComponent } from "#components/base";
import { ROUTES } from "#constants/routes";

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
						I write software <a href="${ROUTES.ROCK}" class="home-hero__easter-egg">&</a> maintain infrastructure I probably don't need.
					</p>

					<div class="home-hero__meta">
						<span class="home-hero__location">Montreal, <a href="${ROUTES.QUEBEC}" class="home-hero__quebec-link"><svg class="home-hero__fleur" viewBox="0 0 219 299" fill="currentColor"><path d="m 182.76,203.56 c 4.8,-7.15 4.4,-22.8 -5.21,-28.32 -7.35,-3.67 -15.65,-2.24 -19.53,0.93 -6.24,3.78 -12.26,15.85 -12.26,28.08 l 21.56,-0.03 -0.01,24.08 -44.75,-0.02 c 0.59,12.38 7.34,22.3 19.9,27.82 -1.62,5.22 -9.19,15.86 -19.6,15.14 -2.05,11.25 -4.01,17.57 -13.36,27.8 -9.36,-10.22 -11.32,-16.55 -13.37,-27.8 -10.41,0.72 -17.98,-9.92 -19.6,-15.14 12.56,-5.52 19.32,-15.44 19.9,-27.82 l -44.75,0.02 v -24.08 l 21.55,0.03 c 0,-12.23 -6,-24.31 -12.25,-28.08 -3.88,-3.17 -12.18,-4.6 -19.52,-0.93 -9.62,5.52 -10.03,21.17 -5.22,28.32 -45.4,-8.43 -40.9,-52.28 -25.43,-68.2 12.5,-12.86 26.13,-14.87 36.63,-10.81 23.88,8.56 39.94,37.09 40.72,79.7 h 12.49 c 0,-38.74 -6.74,-51.09 -24.3,-99.74 C 67.51,81.52 72.82,53.09 88.63,26.92 94.3,17.54 101.37,9.07 109.5,0 c 8.13,9.07 15.2,17.54 20.86,26.92 15.82,26.17 21.13,54.6 12.29,77.59 -17.57,48.65 -24.31,61 -24.31,99.74 h 12.49 c 0.78,-42.61 16.85,-71.14 40.72,-79.7 10.51,-4.05 24.14,-2.05 36.64,10.81 15.46,15.92 19.96,59.76 -25.43,68.2 z"/></svg>Quebec</a></span>
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
