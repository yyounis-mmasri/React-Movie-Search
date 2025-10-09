// src/api.js - IMDb API (بدون API Key!)
const BASE_URL = 'https://imdb.iamidiotareyoutoo.com';

export const IMG_BASE = {
  poster: '',
  backdrop: '',
  profile: ''
};

// List of popular movies
const popularMovies = [
  { id: 'tt2250912', title: 'Spider-Man: Homecoming' },
  { id: 'tt6320628', title: 'Spider-Man: Far from Home' },
  { id: 'tt10872600', title: 'Spider-Man: No Way Home' },
  { id: 'tt0145487', title: 'Spider-Man' },
  { id: 'tt0316654', title: 'Spider-Man 2' },
  { id: 'tt1375666', title: 'Inception' },
  { id: 'tt0468569', title: 'The Dark Knight' },
  { id: 'tt0111161', title: 'The Shawshank Redemption' },
  { id: 'tt0133093', title: 'The Matrix' },
  { id: 'tt0816692', title: 'Interstellar' }
];

export async function getMovieById(imdbId) {
  const response = await fetch(`${BASE_URL}/search?tt=${imdbId}`);
  const data = await response.json();
  
  if (!data.ok) {
    throw new Error('Movie not found');
  }
  
  return {
    id: data.imdbId,
    title: data.short.name,
    poster_path: data.short.image,
    vote_average: data.short.aggregateRating?.ratingValue || 0,
    release_date: data.short.datePublished,
    overview: data.short.description
  };
}

export async function getTrending(page = 1) {
  // Get first movie as example
  const movie = await getMovieById('tt2250912');
  return {
    results: [movie],
    page: 1,
    total_pages: 1,
    total_results: 1
  };
}

export async function searchMovies(query, page = 1) {
  // Filter movies by title
  const filtered = popularMovies.filter(m => 
    m.title.toLowerCase().includes(query.toLowerCase())
  );
  
  if (filtered.length === 0) {
    return {
      results: [],
      page: 1,
      total_pages: 0,
      total_results: 0
    };
  }
  
  // Get full data for first result
  const movie = await getMovieById(filtered[0].id);
  
  return {
    results: [movie],
    page: 1,
    total_pages: 1,
    total_results: filtered.length
  };
}

export default {
  getTrending,
  searchMovies,
  getMovieById,
  IMG_BASE
};