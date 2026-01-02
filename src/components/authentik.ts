import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { BaseComponent } from "#components/base";
import { AUTHENTIK_CONTRIBUTIONS } from "#constants/authentik";

@customElement("authentik-page")
export class AuthentikPage extends BaseComponent {
	render() {
		return html`
			<div class="page authentik-page">
				<header class="page-header">
					<h1 class="page-header__title">authentik</h1>
				</header>

				<div class="authentik-layout">
					<aside class="authentik-sidebar">
						<div class="sidebar-info">
							<span class="sidebar-info__label">Website</span>
							<a href="https://goauthentik.io" target="_blank" rel="noopener" class="sidebar-info__link">goauthentik.io</a>
						</div>
						<div class="sidebar-info">
							<span class="sidebar-info__label">What</span>
							<span class="sidebar-info__value">Open-source identity provider</span>
						</div>
						<div class="sidebar-info">
							<span class="sidebar-info__label">Since</span>
							<span class="sidebar-info__value">January 2025</span>
						</div>
					</aside>

					<main class="authentik-content">
						<section class="content-section">
							<h2>Role</h2>
							<p>
								Technical content editor and developer. I author and maintain 
								technical documentation, contribute code, and perform quality 
								assurance testing.
							</p>
						</section>

						<section class="content-section">
							<h2>Contributions</h2>
							<div class="styled-rows">
								${AUTHENTIK_CONTRIBUTIONS.map(
									(c, i) => html`
										<div class="styled-rows__row">
											<span class="styled-rows__number">${String(i + 1).padStart(2, "0")}</span>
											<span class="styled-rows__text">
												${c.text}
												${c.isWip ? html`<span class="wip">In Progress</span>` : ""}
											</span>
										</div>
									`,
								)}
							</div>
						</section>
					</main>
				</div>
			</div>
		`;
	}
}
