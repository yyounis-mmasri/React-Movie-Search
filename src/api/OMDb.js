// src/api/OMDb.js
// Pure JavaScript - NO React imports!

const BASE_URL = "https://www.omdbapi.com/";
const API_KEY = "93624774";

// Request timeout (in seconds)
const REQ_TIMEOUT_S = 12;

// Transform OMDb movie object to standardized format
function mapMovie(m) {
  return {
    id: m.imdbID,
    title: m.Title,
    year: m.Year,
    type: m.Type,
    posterUrl: m.Poster && m.Poster !== "N/A" ? m.Poster : null,
  };
}

// Generic request handler with timeout
async function request(params) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQ_TIMEOUT_S * 1000);

  try {
    const url = new URL(BASE_URL);
    Object.entries({ apikey: API_KEY, ...params }).forEach(([k, v]) =>
      url.searchParams.set(k, v)
    );

    const res = await fetch(url.toString(), { signal: controller.signal });
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    
    const data = await res.json();
    
    if (data.Response === "False") {
      throw new Error(data.Error || "OMDb error");
    }
    
    return data;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Search for movies by title
 * @param {string} query - Movie title to search
 * @param {number} page - Page number (default: 1)
 * @returns {Promise} Object with items, page, totalResults, totalPages
 */
export async function searchMovies(query, page = 1) {
  const data = await request({ s: query, page, type: "movie" });
  const total = Number(data.totalResults || 0);
  
  return {
    items: (data.Search || []).map(mapMovie),
    page: Number(page),
    totalResults: total,
    totalPages: Math.max(1, Math.ceil(total / 10)),
  };
}

/**
 * Get detailed movie information by IMDb ID
 * @param {string} imdbID - IMDb ID of the movie
 * @returns {Promise} Detailed movie object
 */
export async function getMovieById(imdbID) {
  const d = await request({ i: imdbID, plot: "full" });
  
  return {
    id: d.imdbID,
    title: d.Title,
    year: d.Year,
    posterUrl: d.Poster && d.Poster !== "N/A" ? d.Poster : null,
    plot: d.Plot,
    director: d.Director,
    actors: d.Actors,
    rating: d.imdbRating,
    runtime: d.Runtime,
    genre: d.Genre,
    ...d,
  };
}

/**
 * Get trending movies (aggregated from popular keywords)
 * @param {number} localPage - Local page number (default: 1)
 * @param {number} pageSize - Movies per page (default: 24)
 * @returns {Promise} Object with items, page, totalResults, totalPages
 */
const SEED_QUERIES = [
  "Avengers",
  "Batman",
  "Spider-Man",
  "Mission Impossible",
  "James Bond",
  "Harry Potter",
  "Star Wars",
  "Fast Furious",
  "Matrix",
  "Jurassic",
];

export async function getTrending(localPage = 1, pageSize = 24) {
  // Select 4 keywords for this page (reduces API calls)
  const startIdx = (localPage - 1) % SEED_QUERIES.length;
  const picks = [
    SEED_QUERIES[startIdx],
    SEED_QUERIES[(startIdx + 1) % SEED_QUERIES.length],
    SEED_QUERIES[(startIdx + 2) % SEED_QUERIES.length],
    SEED_QUERIES[(startIdx + 3) % SEED_QUERIES.length],
  ];

  // Fetch page 1 from each keyword (OMDb returns 10 movies per request)
  const results = await Promise.allSettled(
    picks.map((q) => request({ s: q, page: 1, type: "movie" }))
  );

  // Merge results, remove duplicates, filter out missing posters
  const map = new Map();
  for (const r of results) {
    if (r.status === "fulfilled") {
      const items = r.value.Search || [];
      for (const m of items) {
        if (!map.has(m.imdbID) && m.Poster && m.Poster !== "N/A") {
          map.set(m.imdbID, mapMovie(m));
        }
      }
    }
  }

  const merged = Array.from(map.values());

  // Local pagination
  const total = merged.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (localPage - 1) * pageSize;
  const end = start + pageSize;

  return {
    items: merged.slice(start, end),
    page: localPage,
    totalResults: total,
    totalPages,
  };
}

/**
 * Get movie by exact title
 * @param {string} title - Movie title
 * @param {string} year - Movie year (optional)
 * @returns {Promise} Detailed movie object
 */
export async function getMovieByTitle(title, year = null) {
  const params = { t: title, type: "movie", plot: "full" };
  if (year) params.y = year;
  
  const d = await request(params);
  
  return {
    id: d.imdbID,
    title: d.Title,
    year: d.Year,
    posterUrl: d.Poster && d.Poster !== "N/A" ? d.Poster : null,
    plot: d.Plot,
    director: d.Director,
    actors: d.Actors,
    rating: d.imdbRating,
    ...d,
  };
}

// Default export
export default {
  searchMovies,
  getTrending,
  getMovieById,
  getMovieByTitle,
};