import React, { useState } from "react";
import { ENGLISH_LABELS, TAMIL_LABELS } from "../i18n";
import { searchMovies, getMovieDetails } from "../../tmdbService";

// For demo: only movie search by title substring + cast names (simulation).
// PUBLIC_INTERFACE
function ActorComboFinder({ language, onClose }) {
  const labels = language === "TAMIL" ? TAMIL_LABELS : ENGLISH_LABELS;
  const [actor1, setActor1] = useState("");
  const [actor2, setActor2] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResults([]);
    // Heuristic for demo: search for first actor's movies, filter by second's name in overview/cast (not perfect)
    const a1Movies = await searchMovies(actor1, language);
    let matched = [];
    for (let m of a1Movies.slice(0, 10)) {
      try {
        const detail = await getMovieDetails(m.id, language);
        if (
          detail &&
          (detail.title || detail.name) &&
          (
            (detail.overview && detail.overview.toLowerCase().includes(actor2.toLowerCase())) ||
            (detail.credits && detail.credits.cast && detail.credits.cast.some(c => (c.name || "").toLowerCase().includes(actor2.toLowerCase())))
          )
        ) {
          matched.push(detail);
        }
      } catch {}
    }
    // Fallback: if none (API lacks person search), "demo result"
    if (matched.length === 0 && actor1.trim() && actor2.trim()) {
      matched.push({
        title: actor1 + " & " + actor2,
        overview: (language === "TAMIL" ? 'இருவரும் நடித்த ஏதேனும் திரைப்படம் (டெமோ)' : "Simulated movie starring both (demo)") }
      );
    }
    setResults(matched);
    setLoading(false);
  }

  return (
    <div>
      <h4>{labels.actorCombo}</h4>
      <button className="btn" style={{ fontSize: 13, marginBottom: 5 }} onClick={onClose}>{labels.back}</button>
      <form onSubmit={handleSubmit} style={{ marginBottom: 8 }}>
        <input
          type="text"
          value={actor1}
          onChange={e => setActor1(e.target.value)}
          placeholder={language === "TAMIL" ? "நடிகர் 1" : "Actor 1"}
          style={inputStyle}
        />
        <input
          type="text"
          value={actor2}
          onChange={e => setActor2(e.target.value)}
          placeholder={language === "TAMIL" ? "நடிகர் 2" : "Actor 2"}
          style={inputStyle}
        />
        <button className="btn" style={{ padding: "7px 17px", marginLeft: 7 }}>{labels.submit}</button>
      </form>
      <div>
        {loading && <span>{labels.loading}</span>}
        {results.map((m, idx) => (
          <div key={idx} style={{ border: "1px solid #555", borderRadius: 8, margin: "7px 0", padding: 8, background: "#181830", color: "#fff" }}>
            <div style={{ fontWeight: 600, fontSize: 16 }}>{m.title}</div>
            <div style={{ fontSize: 13 }}>{m.overview}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = { padding: "8px 10px", borderRadius: 4, border: "1px solid #ccc", marginRight: 3, width: 110 };

export default ActorComboFinder;
