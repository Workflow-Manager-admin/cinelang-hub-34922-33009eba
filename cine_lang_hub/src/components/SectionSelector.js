import React from "react";
import { ENGLISH_LABELS, TAMIL_LABELS } from "./i18n";

// PUBLIC_INTERFACE
/**
 * SectionSelector lets users pick Hollywood (EN) or Kollywood (TA) after login.
 */
function SectionSelector({ language, onSelectSection }) {
  const labels = language === "TAMIL" ? TAMIL_LABELS : ENGLISH_LABELS;

  return (
    <main className="container" style={{ paddingTop: 110, textAlign: "center" }}>
      <div
        className="hero"
        style={{
          gap: 20,
          background: "rgba(15,61,84,0.13)",
          borderRadius: 15,
          boxShadow: "0 2px 19px rgba(10,10,20,0.09)"
        }}
      >
        <div className="subtitle">{labels.regionSelectTitle}</div>
        <h2 className="title" style={{ fontSize: "2.1rem" }}>{labels.sectionDescription}</h2>
        <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            className="btn btn-large"
            style={{
              minWidth: 185,
              background: "#f43bf7",
              color: "#fff",
              borderRadius: 7,
              fontWeight: 600,
              fontSize: "1.12rem"
            }}
            onClick={() => onSelectSection("HOLLYWOOD")}
          >{labels.hollywood}</button>
          <button
            className="btn btn-large"
            style={{
              minWidth: 185,
              background: "#00c6a6",
              color: "#fff",
              borderRadius: 7,
              fontWeight: 600,
              fontSize: "1.12rem"
            }}
            onClick={() => onSelectSection("KOLLYWOOD")}
          >{labels.kollywood}</button>
        </div>
      </div>
    </main>
  );
}

export default SectionSelector;
