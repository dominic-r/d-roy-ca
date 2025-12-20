import type { Contribution } from "#types";

export const AUTHENTIK_CONTRIBUTIONS: readonly Contribution[] = [
	{
		text: "Created and maintained a comprehensive Glossary defining common terms used throughout authentik and the broader authentication ecosystem, with multiple views and filtering capabilities",
		isWip: true,
	},
	{
		text: "Planned, organized, and built a Learning Center - a structured directory of tutorials and educational content for authentik users",
		isWip: true,
	},
	{
		text: "Contributed to migrating the authentik outpost's proxyv2 module from Redis to PostgreSQL",
		isWip: false,
	},
	{
		text: "Authored and maintained technical documentation, including PostgreSQL upgrade guides for Docker and Kubernetes deployments, and service account documentation",
		isWip: false,
	},
	{
		text: "Led development of the integration template framework and authored multiple integration guides for third-party software",
		isWip: false,
	},
	{
		text: "Contributed to the documentation style guide and integration documentation architecture to ensure consistency across all technical content",
		isWip: false,
	},
	{
		text: "Developed and submitted code pull requests addressing bugs and feature improvements beyond documentation scope",
		isWip: false,
	},
	{
		text: "Conducted QA testing on major releases to verify product stability and usability",
		isWip: false,
	},
] as const;
