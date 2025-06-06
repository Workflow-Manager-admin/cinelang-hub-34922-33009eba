import React, { useState } from "react";
import { ENGLISH_LABELS, TAMIL_LABELS } from "../i18n";
import { searchMovies } from "../../tmdbService";

// PUBLIC_INTERFACE
function FilmDetective({ language, onClose }) {
  const labels = language === "TAMIL" ? TAMIL_LABELS : ENGLISH_LABELS;
  const [actor, setActor] = useState("");
  const [quote, setQuote] = useState("");
  const [year, setYear] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // Simulate by combining all clues as query
    const query = [actor, quote, year].filter(Boolean).join(" ");
    const out = await searchMovies(query, language);
    setResults(out.slice(0, 6));
    setLoading(false);
  }

  return (
    <div>
      <h4>{labels.filmDetective}</h4>
      <button className="btn" style={{ fontSize: 13, marginBottom: 5 }} onClick={onClose}>{labels.back}</button>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 }}>
        <input
          type="text"
          value={actor}
          onChange={e => setActor(e.target.value)}
          placeholder={language === "TAMIL" ? "நடிகர் (பைரவன்)" : "Actor (e.g. Tom Hanks)"}
          style={inputStyle}
        />
        <input
          type="text"
          value={quote}
          onChange={e => setQuote(e.target.value)}
          placeholder={language === "TAMIL" ? "உரைத்துக் காட்டின்" : "Famous quote"}
          style={inputStyle}
        />
        <input
          type="text"
          value={year}
          onChange={e => setYear(e.target.value)}
          placeholder={language === "TAMIL" ? "வருடம்" : "Year"}
          style={inputStyle}
        />
        <button className="btn" style={{ marginTop: 5 }}>{labels.submit}</button>
      </form>
      <div>
        {loading && <span>{labels.loading}</span>}
        {results.map((m, idx) => (
          <div key={m.id || idx} style={{ border: "1px solid #777", borderRadius: 8, margin: "7px 0", padding: 8, background: "#25253a", color: "#fff" }}>
            <div style={{ fontWeight: 600 }}>{m.title || m.name} <span style={{ color: "#ccc", fontSize: 13 }}>({(m.release_date || "").slice(0,4)})</span></div>
            <div style={{ fontSize: 13 }}>{m.overview}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = { padding: "8px 10px", border: "1px solid #ccc", borderRadius: 4 };

export default FilmDetective;
