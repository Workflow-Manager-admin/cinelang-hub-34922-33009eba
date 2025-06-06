import React, { useState } from "react";
import { ENGLISH_LABELS } from "../i18n";

// All Kollywood originals for TA, never English characters in Tamil
const QUESTIONS_EN = [
  {
    character: "Iron Man",
    answer: "Robert Downey Jr.",
  },
  {
    character: "Harry Potter",
    answer: "Daniel Radcliffe",
  },
  {
    character: "Forrest Gump",
    answer: "Tom Hanks",
  },
  {
    character: "Joker",
    answer: "Joaquin Phoenix",
  },
];

const QUESTIONS_TA = [
  {
    character: "அருணாசலம் (இந்து பத்திரிகை)",
    answer: "ரஜினிகாந்த்"
  },
  {
    character: "அமுல்யா (96)",
    answer: "திரிஷா"
  },
  {
    character: "மகீந்திர வர்்மா (கமலர்)",
    answer: "கமல் ஹாசன்"
  },
  {
    character: "அஞ்சலி (அஞ்சலி)",
    answer: "ஷமிலி"
  },
];

function WhoPlayedGame({ language, onClose }) {
  const labels = ENGLISH_LABELS;
  const [idx, setIdx] = useState(0);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState("");

  const questions = language === "TAMIL" ? QUESTIONS_TA : QUESTIONS_EN;
  const q = questions[idx % questions.length];
  const character = q.character;
  const answer = q.answer;

  function handleSubmit(e) {
    e.preventDefault();
    if (guess.trim().toLowerCase() === (answer || "").toLowerCase()) {
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
      <h4>{labels.whoPlayed}</h4>
      <button className="btn" style={{ fontSize: 13, marginBottom: 5 }} onClick={onClose}>{labels.back}</button>
      <div style={{ margin: 8, fontSize: 18, fontWeight: 600 }}>
        Character: {character}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={guess}
          onChange={e => setGuess(e.target.value)}
          placeholder="Actor name"
          style={{ padding: "8px 10px", border: "1px solid #aaa", borderRadius: 4 }}
        />
        <button className="btn" style={{ marginLeft: 7, padding: "7px 18px" }}>{labels.submit}</button>
      </form>
      <div style={{ marginTop: 7, fontWeight: 500, color: result === "Correct!" ? "lime" : "#ffe83b" }}>{result}</div>
      {result && (
        <button className="btn" style={{ marginTop: 8, padding: "6px 17px", fontSize: 14 }} onClick={nextQ}>
          Next
        </button>
      )}
      {result && (
        <div style={{ fontSize: 14, marginTop: 6, color: "#89ffe0" }}>
          Answer: <b>{answer}</b>
        </div>
      )}
    </div>
  );
}

export default WhoPlayedGame;
