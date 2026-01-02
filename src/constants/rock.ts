export interface Album {
	artist: string;
	album: string;
	year: number;
	artworkKey: string;
	mbid: string;
}

export const ALBUMS: readonly Album[] = [
	{
		artist: "Def Leppard",
		album: "Hysteria",
		year: 1987,
		artworkKey: "hysteria",
		mbid: "73385a97-551a-419f-882b-0c77812fc988",
	},
	{
		artist: "Yngwie J. Malmsteen's Rising Force",
		album: "Rising Force",
		year: 1984,
		artworkKey: "rising-force",
		mbid: "cf4b5333-2756-4ea0-b315-7fa08110e382",
	},
	{
		artist: "Yngwie J. Malmsteen's Rising Force",
		album: "Marching Out",
		year: 1985,
		artworkKey: "marching-out",
		mbid: "003371eb-f6ae-4426-a21a-0a941e30d39b",
	},
	{
		artist: "Ozzy Osbourne",
		album: "Ozzmosis",
		year: 1995,
		artworkKey: "ozzmosis",
		mbid: "49fabf36-69f8-4f42-8600-4d82b85e10f3",
	},
	{
		artist: "Queen",
		album: "A Day at the Races",
		year: 1976,
		artworkKey: "a-day-at-the-races",
		mbid: "cae59d41-2e92-401b-807e-f67633646d45",
	},
	{
		artist: "Led Zeppelin",
		album: "Led Zeppelin IV",
		year: 1971,
		artworkKey: "led-zeppelin-iv",
		mbid: "a55a7de4-5a1c-3c84-98c6-28b042ee5202",
	},
	{
		artist: "Black Sabbath",
		album: "Paranoid",
		year: 1970,
		artworkKey: "paranoid",
		mbid: "f3e41767-b460-40c3-aa09-6a38a1d9fd6f",
	},
	{
		artist: "Pink Floyd",
		album: "The Dark Side of the Moon",
		year: 1973,
		artworkKey: "the-dark-side-of-the-moon",
		mbid: "df8fe008-36fa-332d-bca2-8b1c745c09ad",
	},
	{
		artist: "Metallica",
		album: "Master of Puppets",
		year: 1986,
		artworkKey: "master-of-puppets",
		mbid: "d2b38008-536d-3daf-b3df-90b985d01789",
	},
	{
		artist: "Pantera",
		album: "Vulgar Display of Power",
		year: 1992,
		artworkKey: "vulgar-display-of-power",
		mbid: "bf90a62e-6603-4d97-9c52-d08ae72e8b8e",
	},
	{
		artist: "Rainbow",
		album: "Rising",
		year: 1976,
		artworkKey: "rising",
		mbid: "69104057-2554-41e4-8bc9-047422c1af52",
	},
	{
		artist: "Dio",
		album: "Holy Diver",
		year: 1983,
		artworkKey: "holy-diver",
		mbid: "814153f5-315a-32db-af7f-04b1934d33d8",
	},
	{
		artist: "Lynyrd Skynyrd",
		album: "Pronounced Leh-Nerd Skin-Nerd",
		year: 1973,
		artworkKey: "pronounced-leh-nerd-skin-nerd",
		mbid: "c47cc7c8-ffdd-4aa4-9e81-268b38a4d80c",
	},
	{
		artist: "ZZ Top",
		album: "Tres Hombres",
		year: 1973,
		artworkKey: "tres-hombres",
		mbid: "fe924360-a16d-4093-b30c-f296b053f537",
	},
	{
		artist: "T. Rex",
		album: "The Slider",
		year: 1972,
		artworkKey: "the-slider",
		mbid: "e93a03d0-c446-408e-b469-ede9666ddfe9",
	},
	{
		artist: "Bon Jovi",
		album: "Slippery When Wet",
		year: 1986,
		artworkKey: "slippery-when-wet",
		mbid: "eda23449-4776-3e2e-a622-3419a7763b0f",
	},
	{
		artist: "Electric Light Orchestra",
		album: "Out of the Blue",
		year: 1977,
		artworkKey: "out-of-the-blue",
		mbid: "e003b5c0-9d65-4093-a64c-dc7b9a00845e",
	},
	{
		artist: "Boston",
		album: "Boston",
		year: 1976,
		artworkKey: "boston",
		mbid: "0d50268c-439c-40ba-924d-131424e54ce9",
	},
	{
		artist: "The War on Drugs",
		album: "Lost in the Dream",
		year: 2014,
		artworkKey: "lost-in-the-dream",
		mbid: "59143316-e940-4750-905a-23b498f69b13",
	},
] as const;

export const ROCK_QUOTE = {
	text: "Rock and roll is a nuclear blast of reality in a mundane world where no one is allowed to be magnificent.",
	author: "Kim Fowley",
} as const;

export const DEBATE = {
	question:
		"You're building the ultimate supergroup. One spot left on guitar. Who gets it?",
	options: ["Slash", "Clapton"],
} as const;

export const COLLECTION_INTRO = {
	title: "What I've Been Spinning",
	description:
		"The records on heavy rotation lately. No particular order, just what's been hitting right.",
} as const;
