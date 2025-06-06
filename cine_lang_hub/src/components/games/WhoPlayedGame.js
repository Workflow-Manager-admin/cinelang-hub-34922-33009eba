import React, { useState } from "react";
import { ENGLISH_LABELS } from "../i18n";

// Sample demo character-actor data
const QUESTIONS = [
  {
    character: "Iron Man",
    answer: "Robert Downey Jr.",
    ta_character: "ஐரன் மேன்",
    ta_answer: "ராபர்ட் டவ்னி ஜூனியர்"
  },
  {
    character: "Simran (Kannathil Muthamittal)",
    answer: "P. S. Keerthana",
    ta_character: "சிம்ரன் (கன்னத்தில் முத்தமிட்டால்)",
    ta_answer: "பி. எஸ். கீர்த்தனா"
  },
  {
    character: "Harry Potter",
    answer: "Daniel Radcliffe",
    ta_character: "ஹாரி பாட்டர்",
    ta_answer: "டேனியல் ராட்கிளிப்"
  },
  {
    character: "கபாலி",
    answer: "ரஜினிகாந்த்",
    ta_character: "கபாலி",
    ta_answer: "ரஜினிகாந்த்"
  }
];

// PUBLIC_INTERFACE
function WhoPlayedGame({ language, onClose }) {
  const labels = ENGLISH_LABELS;
  const [idx, setIdx] = useState(0);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState("");

  const q = QUESTIONS[idx % QUESTIONS.length];
  const character = language === "TAMIL" ? q.ta_character : q.character;
  const answer = language === "TAMIL" ? q.ta_answer : q.answer;

  function handleSubmit(e) {
    e.preventDefault();
    if (guess.trim().toLowerCase() === answer.toLowerCase()) {
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
