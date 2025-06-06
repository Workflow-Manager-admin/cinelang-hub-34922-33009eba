import React, { useEffect, useState } from "react";
import { ENGLISH_LABELS, TAMIL_LABELS } from "../i18n";
import { fetchTrendingMovies, getMovieDetails } from "../../tmdbService";

// PUBLIC_INTERFACE
function GuessPosterGame({ language, onClose }) {
  const labels = language === "TAMIL" ? TAMIL_LABELS : ENGLISH_LABELS;
  const [movie, setMovie] = useState(null);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState("");
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    fetchTrendingMovies(language).then((arr) => {
      let m = arr.filter((x) => x.poster_path).sort(() => 0.5 - Math.random())[0];
      setMovie(m);
    });
    setGuess(""); setResult(""); setReveal(false);
  }, [language]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!movie) return;
    if (guess.trim().toLowerCase() === (movie.title || movie.name).toLowerCase()) {
      setResult(language === "TAMIL" ? "சரியான விடை!" : "Correct!");
      setReveal(true);
    } else {
      setResult(language === "TAMIL" ? "தவறானது! முயற்சி செய்க." : "Wrong! Try again.");
    }
  }

  return (
    <div>
      <h4>{labels.guessPoster}</h4>
      <button className="btn" style={{ fontSize: 13, marginBottom: 5 }} onClick={onClose}>{labels.back}</button>
      <div style={{ margin: 8, padding: 5 }}>
        {movie && movie.poster_path && (
          <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt="poster"
               style={{ width: 170, filter: reveal ? "" : "blur(8px) brightness(0.7)", borderRadius: 9, boxShadow: "0 2px 12px #080a" }} />
        )}
      </div>
      {!reveal && (
        <form onSubmit={handleSubmit} style={{ marginTop: 6 }}>
          <input
            type="text"
            value={guess}
            onChange={e => setGuess(e.target.value)}
            placeholder={language === "TAMIL" ? "திரைப்படம்" : "Enter movie title"}
            style={{ padding: "8px 12px", borderRadius: 4, border: "1px solid #ccc" }}
          />
          <button className="btn" style={{ padding: "7px 16px", marginLeft: 5 }}>{labels.submit}</button>
        </form>
      )}
      <div style={{ margin: 5, fontWeight: 500, color: result.startsWith("சரி") || result.startsWith("Correct") ? "lime" : "#ffe83b" }}>
        {result}
      </div>
      {reveal && <div style={{ marginTop: 7, fontSize: 16 }}>{movie.title || movie.name}</div>}
    </div>
  );
}
export default GuessPosterGame;
