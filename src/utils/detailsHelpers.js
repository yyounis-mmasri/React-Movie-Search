import { getMovieById } from '../api/OMDb';

export const FALLBACK_POSTER = '/placeholder-poster.png';

export async function fetchMovieDetails(id) {
  if (!id) throw new Error('Invalid movie id');
  return await getMovieById(id);
}

export function buildDetailsVM(d = {}) {
  const posterUrl = d.posterUrl || FALLBACK_POSTER;

  const castMembers = String(d.actors || '')
    .split(',')
    .map((name, idx) => ({
      id: idx,
      name: name.trim(),
      character: '',
      profile_path: null,
    }))
    .filter(m => m.name);

  const genres = String(d.genre || '')
    .split(',')
    .map(g => g.trim())
    .filter(Boolean);

  return {
    title: d.title || 'Unknown Title',
    year: d.year || '',
    rating: d.rating && d.rating !== 'N/A' ? d.rating : null,
    runtime: d.runtime && d.runtime !== 'N/A' ? d.runtime : null,
    plot: d.plot && d.plot !== 'N/A' ? d.plot : null,
    director: d.director && d.director !== 'N/A' ? d.director : null,
    posterUrl,
    castMembers,
    genres,
  };
}