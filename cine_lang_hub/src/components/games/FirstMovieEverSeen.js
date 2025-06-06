import React, { useState } from "react";
import { ENGLISH_LABELS } from "../i18n";
import { discoverMovies } from "../../tmdbService";

// PUBLIC_INTERFACE
function FirstMovieEverSeen({ language, onClose }) {
  const labels = ENGLISH_LABELS;
  const [year, setYear] = useState("");
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMovie(null);
    if (!year || Number(year) < 1920 || Number(year) > new Date().getFullYear()) {
      setMovie({ title: "Invalid year", overview: "" });
      setLoading(false);
      return;
    }
    try {
      const found = await discoverMovies(language, { sort_by: "popularity.desc", year });
      setMovie(found && found.length ? found[0] : { title: "No movie found", overview: "" });
    } catch {
      setMovie({ title: labels.error, overview: "" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h4>{labels.firstMovie}</h4>
      <button className="btn" style={{ fontSize: 13, marginBottom: 5 }} onClick={onClose}>{labels.back}</button>
      <form onSubmit={handleSubmit} style={{ marginBottom: 5 }}>
        <input
          type="number"
          value={year}
          onChange={e => setYear(e.target.value)}
          min={1920}
          max={new Date().getFullYear()}
          placeholder="Birth year"
          style={{ padding: "8px 10px", border: "1px solid #ccc", borderRadius: 4 }}
        />
        <button className="btn" style={{ marginLeft: 8 }}>{labels.submit}</button>
      </form>
      {loading && <span>{labels.loading}</span>}
      {movie && (
        <div style={{ marginTop: 10, background: "#23235c", borderRadius: 8, padding: 8, color: "#fff" }}>
          <div style={{ fontWeight: 600, fontSize: 16 }}>{movie.title}</div>
          <div style={{ fontSize: 13 }}>{movie.overview}</div>
        </div>
      )}
    </div>
  );
}
export default FirstMovieEverSeen;
