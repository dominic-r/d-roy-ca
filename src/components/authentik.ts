import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { BaseComponent } from "#components/base";
import { AUTHENTIK_CONTRIBUTIONS } from "#constants/authentik";
import type { Contribution } from "#types";
import authentikLogo from "../assets/authentik.svg?url";

@customElement("authentik-page")
export class AuthentikPage extends BaseComponent {
	private readonly contributions: readonly Contribution[] =
		AUTHENTIK_CONTRIBUTIONS;

	private renderHeader() {
		return html`
			<div class="work-header">
				<div>
					<h1>authentik</h1>
					<a
						href="https://goauthentik.io"
						target="_blank"
						rel="noopener noreferrer"
						class="authentik-link"
					>goauthentik.io</a>
				</div>
				<img src=${authentikLogo} alt="authentik logo" class="authentik-logo" />
			</div>
		`;
	}

	private renderIntro() {
		return html`
			<p class="intro">
				Since January 2025, I work as a technical content editor and developer
				at authentik, where I author and maintain technical documentation,
				contribute code, and perform quality assurance testing.
			</p>
		`;
	}

	private renderContribution(contribution: Contribution) {
		return html`
			<li>
				${contribution.text}
				${
					contribution.isWip
						? html`<span class="wip-badge">work in progress</span>`
						: ""
				}
			</li>
		`;
	}

	private renderContributions() {
		return html`
			<section class="contributions" aria-labelledby="contributions-heading">
				<h2 id="contributions-heading">Contributions (non-exhaustive)</h2>
				<ul>
					${this.contributions.map((c) => this.renderContribution(c))}
				</ul>
			</section>
		`;
	}

	render() {
		return html`
			<div class="page">
				<div class="container">
					${this.renderHeader()}
					${this.renderIntro()}
					${this.renderContributions()}
				</div>
			</div>
		`;
	}
}
