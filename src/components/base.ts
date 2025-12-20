import { LitElement } from "lit";

/**
 * Base component class that bypasses Shadow DOM for global styles.
 * All page components should extend this class.
 */
export abstract class BaseComponent extends LitElement {
	createRenderRoot() {
		return this;
	}
}
