import React, { useState } from "react";
import "./App.css";
import { AuthProvider, useAuth } from "./components/AuthContext";
import LoginSignupPage from "./components/LoginSignupPage";
import SectionSelector from "./components/SectionSelector";
import HollywoodSection from "./components/HollywoodSection";
import KollywoodSection from "./components/KollywoodSection";
import { ENGLISH_LABELS, TAMIL_LABELS } from "./components/i18n";

function AppContainer() {
  // Main app shell after login
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState(null);
  const labels = user?.language === "TAMIL" ? TAMIL_LABELS : ENGLISH_LABELS;

  if (!user) return <LoginSignupPage />;
  if (!activeSection)
    return (
      <>
        <Navbar user={user} onLogout={logout} />
        <SectionSelector
          language={user.language}
          onSelectSection={setActiveSection}
        />
      </>
    );

  return (
    <>
      <Navbar user={user} onLogout={logout} />
      <main className="container" style={{ paddingTop: 110 }}>
        {activeSection === "HOLLYWOOD" ? (
          <HollywoodSection onBack={() => setActiveSection(null)} />
        ) : (
          <KollywoodSection onBack={() => setActiveSection(null)} />
        )}
      </main>
    </>
  );
}

/**
 * Site Navbar
 */
function Navbar({ user, onLogout }) {
  const labels = user?.language === "TAMIL" ? TAMIL_LABELS : ENGLISH_LABELS;
  return (
    <nav className="navbar">
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <div className="logo">
            <span className="logo-symbol" aria-label="film">🎬</span>
            <span>{labels.siteTitle}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 15 }}>{user?.username ? labels.welcomeUser.replace("{user}", user.username) : ""}</span>
            <button className="btn" style={{ fontSize: 14 }} onClick={onLogout}>
              {labels.logout}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// PUBLIC_INTERFACE
function App() {
  return (
    <AuthProvider>
      <div className="app" style={{ minHeight: "100vh", background: "var(--base-dark)" }}>
        <AppContainer />
      </div>
    </AuthProvider>
  );
}

export default App;