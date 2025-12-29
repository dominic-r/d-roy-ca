import { html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { so } from "#app";
import { BaseComponent } from "#components/base";
import {
	BOOKS,
	type Book,
	type MediaStatus,
	MOVIES,
	type Movie,
} from "#constants/library";

type MediaType = "movies" | "books";
type FilterType = "all" | MediaStatus | "read" | "reading" | "to-read";

@customElement("library-page")
export class LibraryPage extends BaseComponent {
	@state()
	private searchQuery = "";

	@state()
	private activeTab: MediaType = "movies";

	@state()
	private movieFilter: FilterType = "all";

	@state()
	private bookFilter: FilterType = "all";

	private handleSearch(e: Event) {
		const input = e.target as HTMLInputElement;
		this.searchQuery = input.value.toLowerCase();
		if (this.searchQuery) {
			so.search({ query: this.searchQuery, tab: this.activeTab });
		}
	}

	private setTab(tab: MediaType) {
		this.activeTab = tab;
		so.click({ button: "library-tab", tab });
	}

	private setMovieFilter(filter: FilterType) {
		this.movieFilter = filter;
		so.click({ button: "movie-filter", filter });
	}

	private setBookFilter(filter: FilterType) {
		this.bookFilter = filter;
		so.click({ button: "book-filter", filter });
	}

	private filterItems<T extends { title: string; status: string }>(
		items: readonly T[],
		filter: FilterType,
	): T[] {
		const filtered =
			filter === "all"
				? [...items]
				: items.filter((item) => item.status === filter);

		if (!this.searchQuery) return filtered;

		return filtered.filter((item) =>
			item.title.toLowerCase().includes(this.searchQuery),
		);
	}

	private sortByRatingDesc<T extends { rating?: number }>(items: readonly T[]) {
		return [...items].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
	}

	private renderRating(rating?: number) {
		if (!rating) return "";
		return html`<span class="rating">${"★".repeat(rating)}${"☆".repeat(5 - rating)}</span>`;
	}

	private renderStatus(status: string) {
		const labels: Record<string, string> = {
			watched: "watched",
			watching: "watching",
			watchlist: "watchlist",
			read: "read",
			reading: "reading",
			"to-read": "to-read",
		};
		return html`<span class="status ${status}">${labels[status]}</span>`;
	}

	private renderStats() {
		const isMovies = this.activeTab === "movies";
		const filter = isMovies ? this.movieFilter : this.bookFilter;
		const filtered = isMovies
			? this.filterItems(MOVIES, filter)
			: this.filterItems(BOOKS, filter);

		return html`<div class="stats">${filtered.length} items</div>`;
	}

	private renderFilters() {
		const isMovies = this.activeTab === "movies";
		const currentFilter = isMovies ? this.movieFilter : this.bookFilter;
		const setFilter = isMovies
			? this.setMovieFilter.bind(this)
			: this.setBookFilter.bind(this);

		const filters: { label: string; value: FilterType }[] = isMovies
			? [
					{ label: "All", value: "all" },
					{ label: "Watched", value: "watched" },
					{ label: "Watching", value: "watching" },
					{ label: "Watchlist", value: "watchlist" },
				]
			: [
					{ label: "All", value: "all" },
					{ label: "Read", value: "read" },
					{ label: "Reading", value: "reading" },
					{ label: "To Read", value: "to-read" },
				];

		return html`
			<div class="filters">
				${filters.map(
					(f) => html`
						<button
							class=${classMap({ active: currentFilter === f.value })}
							@click=${() => setFilter(f.value)}
						>${f.label}</button>
					`,
				)}
			</div>
		`;
	}

	private renderMovieItem(movie: Movie) {
		return html`
			<li>
				<span class="media-title">
					${movie.title}
					${movie.year ? html`<span class="dim">(${movie.year})</span>` : ""}
				</span>
				<span class="media-meta">
					${this.renderRating(movie.rating)}
					${this.renderStatus(movie.status)}
				</span>
			</li>
		`;
	}

	private renderBookItem(book: Book) {
		return html`
			<li>
				<span class="media-title">
					${book.title}
					<span class="dim">— ${book.author}</span>
				</span>
				<span class="media-meta">
					${this.renderRating(book.rating)}
					${this.renderStatus(book.status)}
				</span>
			</li>
		`;
	}

	private renderContent() {
		const isMovies = this.activeTab === "movies";
		const filter = isMovies ? this.movieFilter : this.bookFilter;
		const filtered = isMovies
			? this.sortByRatingDesc(this.filterItems(MOVIES, filter))
			: this.sortByRatingDesc(this.filterItems(BOOKS, filter));

		if (filtered.length === 0) {
			return html`<p class="dim">No items found.</p>`;
		}

		return html`
			<ul class="media-list">
				${
					isMovies
						? (filtered as Movie[]).map((item) => this.renderMovieItem(item))
						: (filtered as Book[]).map((item) => this.renderBookItem(item))
				}
			</ul>
		`;
	}

	render() {
		return html`
			<div class="page">
				<h1>Library</h1>
				<p class="dim">What I've watched and read.</p>

				<div class="library-controls">
					<div class="tabs">
						<button
							class=${classMap({ active: this.activeTab === "movies" })}
							@click=${() => this.setTab("movies")}
						>Movies & TV (${MOVIES.length})</button>
						<button
							class=${classMap({ active: this.activeTab === "books" })}
							@click=${() => this.setTab("books")}
						>Books (${BOOKS.length})</button>
					</div>

					<input
						type="text"
						class="search-input"
						placeholder="Search..."
						.value=${this.searchQuery}
						@input=${this.handleSearch}
					/>

					${this.renderFilters()}
					${this.renderStats()}
				</div>

				${this.renderContent()}
			</div>
		`;
	}
}
