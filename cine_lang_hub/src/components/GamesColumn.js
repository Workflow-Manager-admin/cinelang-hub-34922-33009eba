import React, { useState } from "react";
import { ENGLISH_LABELS, TAMIL_LABELS } from "./i18n";
import GuessPosterGame from "./games/GuessPosterGame";
import ActorComboFinder from "./games/ActorComboFinder";
import FilmDetective from "./games/FilmDetective";
import WhoPlayedGame from "./games/WhoPlayedGame";
import MovieIQChallenge from "./games/MovieIQChallenge";
import FirstMovieEverSeen from "./games/FirstMovieEverSeen";
import GuessDirector from "./games/GuessDirector";

// PUBLIC_INTERFACE
function GamesColumn({ language }) {
  const [activeGame, setActiveGame] = useState(null);

  const labels = language === "TAMIL" ? TAMIL_LABELS : ENGLISH_LABELS;
  const gameDefs = [
    { key: "guessPoster", label: labels.guessPoster },
    { key: "actorCombo", label: labels.actorCombo },
    { key: "filmDetective", label: labels.filmDetective },
    { key: "whoPlayed", label: labels.whoPlayed },
    { key: "movieIQ", label: labels.movieIQ },
    { key: "firstMovie", label: labels.firstMovie },
    { key: "guessDirector", label: labels.guessDirector },
  ];

  function renderGame() {
    switch (activeGame) {
      case "guessPoster": return <GuessPosterGame language={language} onClose={() => setActiveGame(null)} />;
      case "actorCombo": return <ActorComboFinder language={language} onClose={() => setActiveGame(null)} />;
      case "filmDetective": return <FilmDetective language={language} onClose={() => setActiveGame(null)} />;
      case "whoPlayed": return <WhoPlayedGame language={language} onClose={() => setActiveGame(null)} />;
      case "movieIQ": return <MovieIQChallenge language={language} onClose={() => setActiveGame(null)} />;
      case "firstMovie": return <FirstMovieEverSeen language={language} onClose={() => setActiveGame(null)} />;
      case "guessDirector": return <GuessDirector language={language} onClose={() => setActiveGame(null)} />;
      default: return null;
    }
  }

  return (
    <div>
      {!activeGame && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {gameDefs.map((g) => (
            <button key={g.key} className="btn" style={{ background: "#f43bf7", color: "#fff" }} onClick={() => setActiveGame(g.key)}>
              {g.label}
            </button>
          ))}
        </div>
      )}
      {activeGame && (
        <div style={{ marginTop: 10 }}>
          {renderGame()}
        </div>
      )}
    </div>
  );
}
export default GamesColumn;
