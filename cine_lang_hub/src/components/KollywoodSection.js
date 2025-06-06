import React from "react";
import { TAMIL_LABELS } from "./i18n";
import WhatToWatchColumn from "./WhatToWatchColumn";
import GamesColumn from "./GamesColumn";

// PUBLIC_INTERFACE
/**
 * KollywoodSection component ("TAMIL")
 */
function KollywoodSection({ onBack }) {
  return (
    <div>
      <button className="btn" onClick={onBack} style={{ marginBottom: 16 }}>{TAMIL_LABELS.back}</button>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: 32 }}>
        <div style={{ flex: "2 1 320px", minWidth: 320 }}>
          <h2 className="subtitle">{TAMIL_LABELS.kollywood}</h2>
          <WhatToWatchColumn language="TAMIL" />
        </div>
        <div style={{ flex: "1 1 250px", minWidth: 230 }}>
          <h3 className="subtitle">{TAMIL_LABELS.games}</h3>
          <GamesColumn language="TAMIL" />
        </div>
      </div>
    </div>
  );
}
export default KollywoodSection;
