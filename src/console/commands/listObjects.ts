import { AUTHENTIK_CONTRIBUTIONS } from "#constants/authentik";
import { BOOKS, MOVIES } from "#constants/library";

export type ListSource = "library" | "authentik";

type MediaStatus = "watched" | "watching" | "watchlist";
type BookStatus = "read" | "reading" | "to-read";

interface StatusSummary<T> {
	total: number;
	items: readonly T[];
}

interface LibrarySummary {
	library: {
		movies: {
			total: number;
			detailed: Record<MediaStatus, StatusSummary<(typeof MOVIES)[number]>>;
			items: readonly (typeof MOVIES)[number][];
		};
		books: {
			total: number;
			detailed: Record<BookStatus, StatusSummary<(typeof BOOKS)[number]>>;
			items: readonly (typeof BOOKS)[number][];
		};
	};
}

interface AuthentikSummary {
	authentik: {
		total: number;
		items: readonly {
			index: number;
			text: string;
			status: "wip" | "done";
		}[];
	};
}

const summarizeByStatus = <T extends { status: string }>(
	items: readonly T[],
	statuses: readonly string[],
) => {
	const summary: Record<string, StatusSummary<T>> = {};
	for (const status of statuses) {
		const matching = items.filter((item) => item.status === status);
		summary[status] = {
			total: matching.length,
			items: matching,
		};
	}
	return summary;
};

const listLibraryObjects = (): LibrarySummary => {
	const moviesSummary = summarizeByStatus(MOVIES, [
		"watched",
		"watching",
		"watchlist",
	]);
	const booksSummary = summarizeByStatus(BOOKS, ["read", "reading", "to-read"]);

	return {
		library: {
			movies: {
				total: MOVIES.length,
				detailed: moviesSummary as Record<
					MediaStatus,
					StatusSummary<(typeof MOVIES)[number]>
				>,
				items: MOVIES,
			},
			books: {
				total: BOOKS.length,
				detailed: booksSummary as Record<
					BookStatus,
					StatusSummary<(typeof BOOKS)[number]>
				>,
				items: BOOKS,
			},
		},
	};
};

const listAuthentikObjects = (): AuthentikSummary => {
	const items = AUTHENTIK_CONTRIBUTIONS.map((contribution, index) => ({
		index: index + 1,
		text: contribution.text,
		status: (contribution.isWip ? "wip" : "done") as "wip" | "done",
	}));

	return {
		authentik: {
			total: items.length,
			items,
		},
	};
};

export const listObjects = (source: ListSource = "library") => {
	return source === "library" ? listLibraryObjects() : listAuthentikObjects();
};
