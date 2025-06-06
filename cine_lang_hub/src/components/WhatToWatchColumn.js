import React, { useEffect, useState } from "react";
import { ENGLISH_LABELS } from "./i18n";
import { fetchTrendingMovies, discoverMovies } from "../tmdbService";

// PUBLIC_INTERFACE
/**
 * WhatToWatchColumn
 * @param {string} language - For movie content fetch: 'ENGLISH' or 'TAMIL' (movie content only; UI is always English)
 */
function WhatToWatchColumn({ language }) {
  const [trending, setTrending] = useState([]);
  const [imdbTop, setImdbTop] = useState([]);
  const [loading, setLoading] = useState(true);
  const [familyRec, setFamilyRec] = useState(null);
  const [familyLoading, setFamilyLoading] = useState(false);
  const [age, setAge] = useState("");
  const [duration, setDuration] = useState("");
  const [genre, setGenre] = useState("");
  // Always use ENGLISH_LABELS for interface elements
  const labels = ENGLISH_LABELS;

  // Fetch trending
  useEffect(() => {
    setLoading(true);
    fetchTrendingMovies(language)
      .then(setTrending)
      .finally(() => setLoading(false));
    // Fetch IMDb Top N for demo (sorted by vote_average, popular & min votes > 200 for quality)
    discoverMovies(language, { sort_by: "vote_average.desc", year: undefined, genre: undefined })
      .then((arr) => setImdbTop(arr.filter((m) => m.vote_count > 200).slice(0, 8)));
  }, [language]);

  function handleFamilyNight(e) {
    e.preventDefault();
    setFamilyLoading(true);
    // Simulate: age <=12 gives only G/PG genre, else broader; genre required, duration not really supported by API, will ignore.
    discoverMovies(language, {
      sort_by: "popularity.desc",
      genre: undefined
    }).then((arr) => {
      let filtered = arr;
      if (age && +age <= 12) {
        filtered = arr.filter((m) =>
          m.title &&
          !/adult|18\+|crime|thriller|horror|explicit/i.test(m.overview || "") &&
          (m.genre_ids || []).length <= 2
        );
      }
      if (genre) {
        filtered = filtered.filter((m) => m.genre_ids && m.genre_ids.length && m.genre_ids.includes(parseInt(genre)));
      }
      setFamilyRec(filtered[Math.floor(Math.random() * Math.min(filtered.length, 8))] || null);
    }).finally(() => setFamilyLoading(false));
  }

  // Genre map for demo (subset) - labels always English
  const imdbGenres = [
    { value: "28", label: "Action" },
    { value: "35", label: "Comedy" },
    { value: "16", label: "Animation" },
    { value: "10751", label: "Family" },
    { value: "18", label: "Drama" },
    { value: "27", label: "Horror" },
    { value: "10749", label: "Romance" }
  ];

  return (
    <div>
      {/* Trends Card */}
      <div>
        <div className="section-header" style={{marginTop:0,fontSize:"1.08rem"}}>{labels.trending}</div>
        <div className="movies-row">
          {loading ? <span>{labels.loading}</span>
            : trending.slice(0, 6).map((m) =>
              <MovieCard movie={m} key={m.id} language={language} />)}
        </div>
      </div>

      {/* IMDb Top Picks */}
      <div>
        <div className="section-header" style={{marginTop: 22, fontSize:"1.08rem"}}>{labels.imdbTop}</div>
        <div className="movies-row">
          {imdbTop.length ? imdbTop.map((m) => <MovieCard movie={m} key={m.id} language={language} />) : <span>{labels.loading}</span>}
        </div>
      </div>

      {/* Family Night Generator */}
      <div style={{marginTop:24}}>
        <div className="section-header" style={{fontSize:"1.08rem"}}>{labels.familyNight}</div>
        <form onSubmit={handleFamilyNight} style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <input name="age" type="number" placeholder="Age" min={3} max={99} value={age} onChange={e => setAge(e.target.value)} style={inputStyleMini} />
          <input name="duration" type="number" placeholder="Minutes" value={duration} onChange={e => setDuration(e.target.value)} style={inputStyleMini} />
          <select name="genre" value={genre} onChange={e => setGenre(e.target.value)} style={inputStyleMini}>
            <option value="">Genre</option>
            {imdbGenres.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
          </select>
          <button className="btn" style={{ padding: "8px 19px" }}>{labels.submit}</button>
        </form>
        <div style={{ minHeight: 90, marginTop: 8 }}>
          {familyLoading && <span>{labels.loading}</span>}
          {familyRec && <MovieCard movie={familyRec} language={language} large />}
        </div>
      </div>
    </div>
  );
}

function MovieCard({ movie, language, large }) {
  if (!movie) return null;
  const title = movie.title || movie.name;
  const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : null;
  return (
    <div style={{
      border: "1px solid var(--border-color)",
      background: "rgba(255,255,255,0.015)",
      borderRadius: 8,
      padding: 8,
      width: large ? 175 : 116,
      minHeight: large ? 250 : 180,
      textAlign: "center",
      fontSize: large ? 17 : 14
    }}>
      {poster ? <img src={poster} style={{ width: "100%", borderRadius: 5, filter: "contrast(1.2)" }} alt={title} /> : null}
      <div style={{
        marginTop: 7, fontWeight: 600,
        color: "#fff",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }}>{title}</div>
      <div style={{ fontSize: 12, color: "#bbbbbb" }}>{(movie.release_date || "").slice(0, 4)}</div>
    </div>
  );
}

const inputStyleMini = {
  padding: "8px 10px", border: "1px solid var(--border-color)", borderRadius: "4px", fontSize: 14, minWidth: 60
};

export default WhatToWatchColumn;
