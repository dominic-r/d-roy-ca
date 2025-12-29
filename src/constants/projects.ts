export interface Project {
	title: string;
	description: string;
	tags: string[];
	link?: string;
	github?: string;
}

export const PROJECTS: readonly Project[] = [
	{
		title: "d-roy.ca",
		description: "This website.",
		tags: ["Lit", "TypeScript", "Bun", "SCSS"],
		github: "https://github.com/dominic-r/d-roy-ca",
	},
] as const;
