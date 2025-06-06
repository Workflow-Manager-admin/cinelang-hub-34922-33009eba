// 
// tmdbService.js
//
// Utility to interact with The Movie Database (TMDb) API
//

const API_KEY = '5bc67d3b06aecbd18121a3cbbc16eb59';
const API_BASE_URL = 'https://api.themoviedb.org/3';

// Supported language codes for TMDb
const LANGUAGE_CODES = {
  ENGLISH: 'en-US',
  TAMIL: 'ta-IN',
};

/**
 * PUBLIC_INTERFACE
 * Fetch trending movies for a region/language.
 * For Kollywood (TAMIL), only strictly return movies whose original_language is Tamil (from TMDb trending endpoint).
 */
export async function fetchTrendingMovies(langRegion = 'ENGLISH', mediaType = 'movie', timeWindow = 'week') {
  const langCode = LANGUAGE_CODES[langRegion] || LANGUAGE_CODES.ENGLISH;
  const url = `${API_BASE_URL}/trending/${mediaType}/${timeWindow}?api_key=${API_KEY}&language=${langCode}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error('Failed to fetch trending movies');
  const data = await resp.json();
  // For Kollywood: strictly filter to original_language 'ta'
  if (langRegion === 'TAMIL') {
    return (data.results || []).filter(
      m => m.original_language === 'ta'
    );
  }
  return data.results;
}

/**
 * PUBLIC_INTERFACE
 * Search movies by query and region/language.
 * @param {string} query The search term (movie name, etc.)
 * @param {'ENGLISH'|'TAMIL'} langRegion Either 'ENGLISH' or 'TAMIL'
 * @param {number} [page] Pagination page number (default: 1)
 * @returns {Promise<Array>} Array of movie objects
 */
export async function searchMovies(query, langRegion = 'ENGLISH', page = 1) {
  const langCode = LANGUAGE_CODES[langRegion] || LANGUAGE_CODES.ENGLISH;
  const url = `${API_BASE_URL}/search/movie?api_key=${API_KEY}&language=${langCode}&query=${encodeURIComponent(query)}&page=${page}&include_adult=false`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error('Failed to search movies');
  const data = await resp.json();
  return data.results;
}

/**
 * PUBLIC_INTERFACE
 * Discover movies filtered by language (native-language resources).
 * @param {'ENGLISH'|'TAMIL'} langRegion Either 'ENGLISH' or 'TAMIL'
 * @param {Object} [options] Optional filtering options: { sort_by, year, genre }
 * @returns {Promise<Array>} Array of movie objects
 */
export async function discoverMovies(langRegion = 'ENGLISH', options = {}) {
  const langCode = LANGUAGE_CODES[langRegion] || LANGUAGE_CODES.ENGLISH;
  const withOriginalLanguage = langRegion === 'ENGLISH' ? 'en' : 'ta';

  let url = `${API_BASE_URL}/discover/movie?api_key=${API_KEY}`;
  url += `&language=${langCode}`;
  url += `&with_original_language=${withOriginalLanguage}`;

  // Optional filters
  if (options.sort_by)
    url += `&sort_by=${encodeURIComponent(options.sort_by)}`;
  if (options.year)
    url += `&year=${encodeURIComponent(options.year)}`;
  if (options.genre)
    url += `&with_genres=${encodeURIComponent(options.genre)}`;

  const resp = await fetch(url);
  if (!resp.ok) throw new Error('Failed to discover movies');
  const data = await resp.json();
  return data.results;
}

/**
 * PUBLIC_INTERFACE
 * Fetch movie details by TMDb movie ID and region/language.
 * @param {number|string} movieId
 * @param {'ENGLISH'|'TAMIL'} langRegion
 * @returns {Promise<Object>} The movie details object
 */
export async function getMovieDetails(movieId, langRegion = 'ENGLISH') {
  const langCode = LANGUAGE_CODES[langRegion] || LANGUAGE_CODES.ENGLISH;
  const url = `${API_BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=${langCode}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error('Failed to fetch movie details');
  return resp.json();
}

// (getKollywoodPriorityTrending has been removed; Kollywood "Trending Now" now only shows live trending Tamil movies directly from TMDb.)

