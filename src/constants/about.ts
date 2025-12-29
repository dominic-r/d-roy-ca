export const SKILLS = ["a", "b", "c"] as const;

export type Skill = (typeof SKILLS)[number];
