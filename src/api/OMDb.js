
const API_BASE = "https://www.omdbapi.com/";
const API_KEY = "93624774"; 
async function http(params = {}) {
  const url = new URL(API_BASE);
  url.search = new URLSearchParams({ apikey: API_KEY, ...params }).toString();

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);

  const data = await res.json();
  if (data.Response === "False") {
    throw new Error(data.Error || "OMDb error");
  }
  return data;
}

/** Search by title text (maps to ?s=...)  */
export async function searchMovies({ q, page = 1, type = "movie" } = {}) {
  const s = (q || "").trim();
  if (!s) throw new Error("Query is required");
  return http({ s, page, type });
}

/** Get details by IMDb ID (maps to ?i=...) */
export function getById(imdbID) {
  if (!imdbID?.startsWith?.("tt")) throw new Error("Invalid IMDb ID");
  return http({ i: imdbID, plot: "full" });
}

/** Simple "feed" for Home (no real trending in OMDb) */
export function getDefaultFeed(page = 1) {
  return searchMovies({ q: "movie", page, type: "movie" });
}

/** Poster helper */
export function safePoster(poster) {
  return poster && poster !== "N/A" ? poster : "";
}

export default { searchMovies, getById, getDefaultFeed, safePoster };
