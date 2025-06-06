import React, { useState } from "react";
import { ENGLISH_LABELS } from "./i18n";
import WhatToWatchColumn from "./WhatToWatchColumn";
import GamesColumn from "./GamesColumn";

// PUBLIC_INTERFACE
/**
 * HollywoodSection component ("ENGLISH")
 */
function HollywoodSection({ onBack }) {
  // Only one main view for this section
  return (
    <div>
      <button className="btn" onClick={onBack} style={{ marginBottom: 16 }}>{ENGLISH_LABELS.back}</button>
      <div className="section-main">
        <section className="section-col">
          <div className="section-header">
            <span role="img" aria-label="film">🍿</span>{ENGLISH_LABELS.whatToWatch}
          </div>
          <hr className="section-divider" />
          <WhatToWatchColumn language="ENGLISH" />
        </section>
        <section className="section-col section-col--games">
          <div className="section-header">
            <span role="img" aria-label="games">🎲</span>{ENGLISH_LABELS.games}
          </div>
          <hr className="section-divider" />
          <GamesColumn language="ENGLISH" />
        </section>
      </div>
    </div>
  );
}
export default HollywoodSection;
