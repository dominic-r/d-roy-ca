import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { BaseComponent } from "#components/base";
import { AUTHENTIK_CONTRIBUTIONS } from "#constants/authentik";
import authentikLogo from "../assets/authentik.svg?url";

@customElement("authentik-page")
export class AuthentikPage extends BaseComponent {
	render() {
		return html`
			<div class="page">
				<h1>authentik <img src=${authentikLogo} alt="" class="authentik-logo" /></h1>
				<p class="dim"><a href="https://goauthentik.io" target="_blank" rel="noopener">goauthentik.io</a></p>

				<p>
					Since January 2025, I work as a technical content editor and developer
					at authentik, where I author and maintain technical documentation,
					contribute code, and perform quality assurance testing.
				</p>

				<h2>Contributions</h2>
				<ul>
					${AUTHENTIK_CONTRIBUTIONS.map(
						(c) => html`
							<li>
								${c.text}
								${c.isWip ? html`<span class="wip">[wip]</span>` : ""}
							</li>
						`,
					)}
				</ul>
			</div>
		`;
	}
}
