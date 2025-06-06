import React, { useState } from "react";
import { ENGLISH_LABELS, TAMIL_LABELS } from "../i18n";

// Demo movie trivia Q&A (year/director -> movie)
const QUESTIONS = [
  {
    year: "1994",
    director: "Frank Darabont",
    en: "The Shawshank Redemption",
    ta: "ஷாவ்‌ஷேங்க் ரிடெம்ப்ஷன்"
  },
  {
    year: "2018",
    director: "Pa. Ranjith",
    en: "Kaala",
    ta: "காலா"
  },
  {
    year: "1997",
    director: "James Cameron",
    en: "Titanic",
    ta: "டைட்டானிக்"
  },
  {
    year: "2000",
    director: "Bala",
    en: "Nandha",
    ta: "நந்தா"
  }
];

// PUBLIC_INTERFACE
function MovieIQChallenge({ language, onClose }) {
  const labels = language === "TAMIL" ? TAMIL_LABELS : ENGLISH_LABELS;
  const [idx, setIdx] = useState(0);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState("");
  const q = QUESTIONS[idx % QUESTIONS.length];

  function handleSubmit(e) {
    e.preventDefault();
    const correct = (language === "TAMIL" ? q.ta : q.en).toLowerCase();
    if (guess.trim().toLowerCase() === correct) {
      setResult(labels.movieIQ + ": " + (language === "TAMIL" ? "சரி!" : "Correct!"));
    } else {
      setResult(labels.movieIQ + ": " + (language === "TAMIL" ? "தவறானது!" : "Wrong!"));
    }
  }
  function nextQ() {
    setGuess(""); setResult(""); setIdx(i => i + 1);
  }

  return (
    <div>
      <h4>{labels.movieIQ}</h4>
      <button className="btn" style={{ fontSize: 13, marginBottom: 5 }} onClick={onClose}>{labels.back}</button>
      <div style={{ margin: 8, fontSize: 17 }}>
        {language === "TAMIL"
          ? `வर्षம்: ${q.year} · இயக்குனர்: ${q.director}`
          : `Year: ${q.year} · Director: ${q.director}`}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={guess}
          onChange={e => setGuess(e.target.value)}
          placeholder={language === "TAMIL" ? "திரைப்பட பெயர்" : "Movie title"}
          style={{ padding: "8px 10px", border: "1px solid #bbb", borderRadius: 4 }}
        />
        <button className="btn" style={{ marginLeft: 8 }}>{labels.submit}</button>
      </form>
      <div style={{ marginTop: 6, fontWeight: 500, color: result.includes("சரி") || result.includes("Correct") ? "lime" : "#ffe83b" }}>{result}</div>
      {result && (
        <>
          <button className="btn" style={{ marginTop: 8, fontSize: 14, padding: "6px 16px" }} onClick={nextQ}>
            {language === "TAMIL" ? "அடுத்தது" : "Next"}
          </button>
          <div style={{ fontSize: 14, marginTop: 5, color: "#89ffe0" }}>
            {language === "TAMIL" ? <>பதில்: <b>{q.ta}</b></> : <>Answer: <b>{q.en}</b></>}
          </div>
        </>
      )}
    </div>
  );
}

export default MovieIQChallenge;
