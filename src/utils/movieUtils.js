
export const FALLBACK_POSTER = '/placeholder-poster.png';


export function normalizeMovie(movie = {}) {
  const id =
    movie.id ??
    movie.imdbID ??
    movie.imdb_id ??
    null;

  const title =
    movie.title ??
    movie.Title ??
    movie.name ??
    'Unknown Title';

  const year =
    movie.year ??
    movie.Year ??
    (typeof movie.release_date === 'string'
      ? movie.release_date.split('-')[0]
      : undefined) ??
    'N/A';

  const posterUrl =
    movie.posterUrl ??
    movie.Poster ??
    movie.poster_path ??
    FALLBACK_POSTER;

  const rating =
    movie.rating ??
    movie.imdbRating ??
    movie.vote_average ??
    null;

  return { id, title, year, posterUrl, rating, raw: movie };
}