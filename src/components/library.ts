import { html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { so } from "#app";
import { BaseComponent } from "#components/base";
import {
	BOOKS,
	type Book,
	type MediaStatus,
	MOVIES,
	type Movie,
} from "#constants/library";

@customElement("library-page")
export class LibraryPage extends BaseComponent {
	@state()
	private moviesExpanded = false;

	@state()
	private booksExpanded = false;

	private readonly toggleMoviesExpanded = () => {
		this.moviesExpanded = !this.moviesExpanded;
		so.click({
			button: "movies-expand",
			expanded: String(this.moviesExpanded),
		});
	};

	private readonly toggleBooksExpanded = () => {
		this.booksExpanded = !this.booksExpanded;
		so.click({ button: "books-expand", expanded: String(this.booksExpanded) });
	};

	private readonly movies: readonly Movie[] = MOVIES;

	private readonly books: readonly Book[] = BOOKS;

	private readonly COLLAPSED_LIMIT = 10;

	private renderRating(rating?: number) {
		if (!rating) return "";
		return html`<span class="rating">${"★".repeat(rating)}${"☆".repeat(5 - rating)}</span>`;
	}

	private renderStatusBadge(
		status: MediaStatus | "read" | "reading" | "to-read",
	) {
		const labels: Record<string, string> = {
			watched: "watched",
			watching: "watching",
			watchlist: "want to watch",
			read: "read",
			reading: "reading",
			"to-read": "want to read",
		};
		return html`<span class="status-badge status-${status}">${labels[status]}</span>`;
	}

	private sortByRatingDesc<T extends { rating?: number }>(items: readonly T[]) {
		return [...items].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
	}

	private renderMovieSection(
		title: string,
		movies: readonly Movie[],
		isCollapsible: boolean,
	) {
		if (movies.length === 0) return "";
		const sortedMovies = this.sortByRatingDesc(movies);
		const displayMovies =
			isCollapsible && !this.moviesExpanded
				? sortedMovies.slice(0, this.COLLAPSED_LIMIT)
				: sortedMovies;
		const hasMore = isCollapsible && sortedMovies.length > this.COLLAPSED_LIMIT;

		return html`
			<div class="media-section">
				<h3>${title} <span class="count">(${movies.length})</span></h3>
				<ul class="media-list">
					${displayMovies.map(
						(movie) => html`
							<li class="media-item">
								<div class="media-info">
									<span class="media-title">${movie.title}</span>
									${movie.year ? html`<span class="media-year">(${movie.year})</span>` : ""}
								</div>
								<div class="media-meta">
									${this.renderRating(movie.rating)}
									${this.renderStatusBadge(movie.status)}
								</div>
							</li>
						`,
					)}
				</ul>
				${
					hasMore
						? html`
					<button
						class="expand-btn"
						@click=${this.toggleMoviesExpanded}
					>
						${this.moviesExpanded ? "Show less" : `Show all ${movies.length} items`}
					</button>
				`
						: ""
				}
			</div>
		`;
	}

	private renderBookSection(
		title: string,
		books: readonly Book[],
		isCollapsible: boolean,
	) {
		if (books.length === 0) return "";
		const sortedBooks = this.sortByRatingDesc(books);
		const displayBooks =
			isCollapsible && !this.booksExpanded
				? sortedBooks.slice(0, this.COLLAPSED_LIMIT)
				: sortedBooks;
		const hasMore = isCollapsible && sortedBooks.length > this.COLLAPSED_LIMIT;

		return html`
			<div class="media-section">
				<h3>${title} <span class="count">(${books.length})</span></h3>
				<ul class="media-list">
					${displayBooks.map(
						(book) => html`
							<li class="media-item">
								<div class="media-info">
									<span class="media-title">${book.title}</span>
									<span class="media-author">by ${book.author}</span>
								</div>
								<div class="media-meta">
									${this.renderRating(book.rating)}
									${this.renderStatusBadge(book.status)}
								</div>
							</li>
						`,
					)}
				</ul>
				${
					hasMore
						? html`
					<button
						class="expand-btn"
						@click=${this.toggleBooksExpanded}
					>
						${this.booksExpanded ? "Show less" : `Show all ${books.length} items`}
					</button>
				`
						: ""
				}
			</div>
		`;
	}

	private renderMovies() {
		const watched = this.movies.filter((m) => m.status === "watched");
		const watching = this.movies.filter((m) => m.status === "watching");
		const watchlist = this.movies.filter((m) => m.status === "watchlist");

		return html`
			<section class="watchlist-category" aria-labelledby="movies-heading">
				<h2 id="movies-heading">Movies & TV Shows</h2>
				${this.renderMovieSection("Watched", watched, true)}
				${this.renderMovieSection("Currently Watching", watching, false)}
				${this.renderMovieSection("Want to Watch", watchlist, false)}
			</section>
		`;
	}

	private renderBooks() {
		const read = this.books.filter((b) => b.status === "read");
		const reading = this.books.filter((b) => b.status === "reading");
		const toRead = this.books.filter((b) => b.status === "to-read");

		return html`
			<section class="watchlist-category" aria-labelledby="books-heading">
				<h2 id="books-heading">Books</h2>
				${this.renderBookSection("Read", read, true)}
				${this.renderBookSection("Currently Reading", reading, false)}
				${this.renderBookSection("Want to Read", toRead, false)}
			</section>
		`;
	}

	render() {
		return html`
			<div class="page">
				<div class="container">
					<h1>Library</h1>
					<p class="intro">
						A non-exhaustive list of movies I've watched and books I've read,
						plus what's on my radar. Not updated daily, just a general snapshot.
					</p>
					<p class="recommend-cta">
						Want to recommend me something? <a href="mailto:dominic+wwwrec@sdko.org">Send me a recommendation</a>
					</p>
					${this.renderMovies()}
					${this.renderBooks()}
				</div>
			</div>
		`;
	}
}
