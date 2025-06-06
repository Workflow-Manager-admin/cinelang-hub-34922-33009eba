import React, { useState } from "react";
import { ENGLISH_LABELS } from "../i18n";

// Only Tamil (Kollywood) movie trivia for TA mode; English for Hollywood
const QUESTIONS_EN = [
  {
    year: "1994",
    director: "Frank Darabont",
    answer: "The Shawshank Redemption"
  },
  {
    year: "1997",
    director: "James Cameron",
    answer: "Titanic"
  },
  {
    year: "2010",
    director: "Christopher Nolan",
    answer: "Inception"
  },
  {
    year: "1994",
    director: "Robert Zemeckis",
    answer: "Forrest Gump"
  }
];

// All must be original Kollywood (Tamil) cinema – no dubs/remakes
const QUESTIONS_TA = [
  {
    year: "1994",
    director: "கதிர்",
    answer: "காதலர் தினம்"
  },
  {
    year: "2016",
    director: "சுதா கொங்கரா",
    answer: "இறுதிச்சுற்று"
  },
  {
    year: "2005",
    director: "செல்வராகவன்",
    answer: "புதுப்பேட்டை"
  },
  {
    year: "1987",
    director: "மணி ரத்னம்",
    answer: "நாயகன்"
  },
  {
    year: "2003",
    director: "அமீர்",
    answer: "ராமன் தேடி சேதுக்கை"
  }
];

function MovieIQChallenge({ language, onClose }) {
  const labels = ENGLISH_LABELS;
  const [idx, setIdx] = useState(0);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState("");
  const questions = language === "TAMIL" ? QUESTIONS_TA : QUESTIONS_EN;
  const q = questions[idx % questions.length];

  function handleSubmit(e) {
    e.preventDefault();
    const correct = (q.answer || "").toLowerCase();
    if (guess.trim().toLowerCase() === correct) {
      setResult("Correct!");
    } else {
      setResult("Wrong!");
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
        Year: {q.year} · Director: {q.director}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={guess}
          onChange={e => setGuess(e.target.value)}
          placeholder="Movie title"
          style={{ padding: "8px 10px", border: "1px solid #bbb", borderRadius: 4 }}
        />
        <button className="btn" style={{ marginLeft: 8 }}>{labels.submit}</button>
      </form>
      <div style={{ marginTop: 6, fontWeight: 500, color: result === "Correct!" ? "lime" : "#ffe83b" }}>{result}</div>
      {result && (
        <>
          <button className="btn" style={{ marginTop: 8, fontSize: 14, padding: "6px 16px" }} onClick={nextQ}>
            Next
          </button>
          <div style={{ fontSize: 14, marginTop: 5, color: "#89ffe0" }}>
            Answer: <b>{q.answer}</b>
          </div>
        </>
      )}
    </div>
  );
}

export default MovieIQChallenge;
