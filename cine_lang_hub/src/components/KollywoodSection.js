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
      <div className="section-main">
        <section className="section-col">
          <div className="section-header">
            <span role="img" aria-label="film">🎬</span>{ENGLISH_LABELS.kollywood}
          </div>
          <hr className="section-divider" />
          <WhatToWatchColumn language="TAMIL" />
        </section>
        <section className="section-col section-col--games">
          <div className="section-header">
            <span role="img" aria-label="games">🎲</span>{ENGLISH_LABELS.games}
          </div>
          <hr className="section-divider" />
          <GamesColumn language="TAMIL" />
        </section>
      </div>
    </div>
  );
}
export default KollywoodSection;
