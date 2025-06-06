import React, { useState } from "react";
import { ENGLISH_LABELS } from "./i18n";
import WhatToWatchColumn from "./WhatToWatchColumn";
import GamesColumn from "./GamesColumn";

// PUBLIC_INTERFACE
/**
 * HollywoodSection component ("ENGLISH")
 */
function HollywoodSection({ onBack }) {
  const [view, setView] = useState("main");

  return (
    <div>
      <button className="btn" onClick={onBack} style={{ marginBottom: 16 }}>{ENGLISH_LABELS.back}</button>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: 32 }}>
        <div style={{ flex: "2 1 320px", minWidth: 320 }}>
          <h2 className="subtitle">{ENGLISH_LABELS.hollywood}</h2>
          <WhatToWatchColumn language="ENGLISH" />
        </div>
        <div style={{ flex: "1 1 250px", minWidth: 230 }}>
          <h3 className="subtitle">{ENGLISH_LABELS.games}</h3>
          <GamesColumn language="ENGLISH" />
        </div>
      </div>
    </div>
  );
}
export default HollywoodSection;
