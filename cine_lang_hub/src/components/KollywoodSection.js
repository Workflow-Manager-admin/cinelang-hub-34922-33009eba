import React from "react";
import { ENGLISH_LABELS } from "./i18n";
import WhatToWatchColumn from "./WhatToWatchColumn";
import GamesColumn from "./GamesColumn";

// PUBLIC_INTERFACE
/**
 * KollywoodSection component for Kollywood/Tamil films,
 * but UI is always in English, only movie content in Tamil.
 */
function KollywoodSection({ onBack }) {
  return (
    <div>
      <button className="btn" onClick={onBack} style={{ marginBottom: 16 }}>{ENGLISH_LABELS.back}</button>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: 32 }}>
        <div style={{ flex: "2 1 320px", minWidth: 320 }}>
          <h2 className="subtitle">{ENGLISH_LABELS.kollywood}</h2>
          {/* UI in English, only movie content in Tamil */}
          <WhatToWatchColumn language="TAMIL" />
        </div>
        <div style={{ flex: "1 1 250px", minWidth: 230 }}>
          <h3 className="subtitle">{ENGLISH_LABELS.games}</h3>
          <GamesColumn language="TAMIL" /> {/* Games UI in English, movie clues/answers can be Tamil */}
        </div>
      </div>
    </div>
  );
}
export default KollywoodSection;
