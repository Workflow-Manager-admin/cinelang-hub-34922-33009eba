import React, { useState } from "react";
import { ENGLISH_LABELS } from "../i18n";

// Demo movie/director pairs
const QUIZ_EN = [
  {
    movie: "Inception",
    director: "Christopher Nolan"
  },
  {
    movie: "Parasite",
    director: "Bong Joon-ho"
  },
  {
    movie: "Forrest Gump",
    director: "Robert Zemeckis"
  },
  {
    movie: "The Godfather",
    director: "Francis Ford Coppola"
  }
];

const QUIZ_TA = [
  {
    movie: "நாயகன்",
    director: "மணி ரத்னம்"
  },
  {
    movie: "கபாலி",
    director: "பா. ரஞ்சித்"
  },
  {
    movie: "அசுரன்",
    director: "வெற்றிமாறன்"
  },
  {
    movie: "விக்ரம்",
    director: "லோகேஷ் கனகராஜ்"
  },
  {
    movie: "மெர்சல்",
    director: "அதLEE"
  }
];

function GuessDirector({ language, onClose }) {
  const labels = ENGLISH_LABELS;
  const [idx, setIdx] = useState(0);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState("");
  const quiz = language === "TAMIL" ? QUIZ_TA : QUIZ_EN;
  const q = quiz[idx % quiz.length];
  const movie = q.movie;
  const answer = q.director;

  function handleSubmit(e) {
    e.preventDefault();
    if (guess.trim().toLowerCase() === (answer || "").toLowerCase()) {
      setResult("Correct!");
    } else {
      setResult("Wrong!");
    }
  }
  function nextQ() {
    setGuess(""); setResult(""); setIdx(t => t + 1);
  }

  return (
    <div>
      <h4>{labels.guessDirector}</h4>
      <button className="btn" style={{ fontSize: 13, marginBottom: 5 }} onClick={onClose}>{labels.back}</button>
      <div style={{ margin: 8, fontSize: 18 }}>
        Movie: <b>{movie}</b>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={guess}
          onChange={e => setGuess(e.target.value)}
          placeholder="Director name"
          style={{ padding: "8px 10px", border: "1px solid #bbb", borderRadius: 4 }}
        />
        <button className="btn" style={{ marginLeft: 8 }}>{labels.submit}</button>
      </form>
      <div style={{ marginTop: 7, fontWeight: 500, color: result === "Correct!" ? "lime" : "#ffe83b" }}>
        {result}
      </div>
      {result && (
        <>
          <button className="btn" style={{ marginTop: 8, fontSize: 14, padding: "6px 16px" }} onClick={nextQ}>
            Next
          </button>
          <div style={{ fontSize: 14, marginTop: 5, color: "#89ffe0" }}>
            Answer: <b>{answer}</b>
          </div>
        </>
      )}
    </div>
  );
}

export default GuessDirector;
