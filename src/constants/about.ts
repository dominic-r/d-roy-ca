export const HOBBIES = [
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
] as const;

export type Hobby = (typeof HOBBIES)[number];
