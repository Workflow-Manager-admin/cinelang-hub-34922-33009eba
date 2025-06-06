import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { ENGLISH_LABELS, TAMIL_LABELS } from "./i18n";

// PUBLIC_INTERFACE
function LoginSignupPage() {
  const [loginMode, setLoginMode] = useState(true);
  const [form, setForm] = useState({ username: "", password: "", language: "ENGLISH" });
  const [message, setMessage] = useState("");
  const { login, signup } = useAuth();

  const labels = form.language === "TAMIL" ? TAMIL_LABELS : ENGLISH_LABELS;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    if (loginMode) {
      const r = login({ username: form.username, password: form.password });
      setMessage(r.message);
    } else {
      const r = signup(form);
      setMessage(r.message);
    }
  }

  return (
    <div className="container" style={{ paddingTop: 110, maxWidth: 420 }}>
      <div className="hero" style={{ gap: 20 }}>
        <div className="subtitle">{loginMode ? labels.loginTitle : labels.signupTitle}</div>
        <h1 className="title" style={{ fontSize: "2.6rem" }}>{labels.siteTitle}</h1>

        <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
          <input
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            placeholder={labels.username}
            style={inputStyle}
            autoComplete="username"
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder={labels.password}
            style={inputStyle}
            autoComplete={loginMode ? "current-password" : "new-password"}
          />
          {!loginMode && (
            <select name="language" value={form.language} onChange={handleChange} style={inputStyle}>
              <option value="ENGLISH">{ENGLISH_LABELS.selectLang}</option>
              <option value="TAMIL">{TAMIL_LABELS.selectLang}</option>
            </select>
          )}
          <button className="btn btn-large" style={{ marginTop: 8 }}>{loginMode ? labels.login : labels.signup}</button>
        </form>
        <div style={{ minHeight: 24, color: "#FFD0D0", marginTop: 2, fontSize: 15 }}>{message}</div>
        <div style={{ margin: 2 }}>
          <small>
            {loginMode
              ? (
                <span>
                  {labels.signupPrompt}{" "}
                  <button
                    className="btn"
                    style={{ background: "transparent", color: "var(--base-light)", fontWeight: 500, fontSize: 15, padding: 0, border: "none", cursor: "pointer" }}
                    onClick={() => { setLoginMode(false); setMessage(""); }}
                  >
                    {labels.signup}
                  </button>
                </span>
              )
              : (
                <span>
                  {labels.loginPrompt}{" "}
                  <button
                    className="btn"
                    style={{ background: "transparent", color: "var(--base-light)", fontWeight: 500, fontSize: 15, padding: 0, border: "none", cursor: "pointer" }}
                    onClick={() => { setLoginMode(true); setMessage(""); }}
                  >
                    {labels.login}
                  </button>
                </span>
              )
            }
          </small>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "12px 16px",
  border: "1px solid var(--border-color)",
  borderRadius: "4px",
  fontSize: "1rem"
};

export default LoginSignupPage;
