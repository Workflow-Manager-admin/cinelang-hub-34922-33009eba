import React, { createContext, useContext, useState, useEffect } from "react";

// PUBLIC_INTERFACE
/**
 * AuthContext provides authentication state and methods for login/signup/logout.
 */
const AuthContext = createContext();

/**
 * Simulated "database" of users in-memory for demo (in reality, use secure backend!).
 */
const initialUsers = [
  // demo accounts
  { username: "cinelover", password: "cine123", language: "ENGLISH" },
  { username: "cinemamani", password: "சென்னை123", language: "TAMIL" }
];

// Helper: load users from localStorage
function getStoredUsers() {
  try {
    const stored = JSON.parse(window.localStorage.getItem("clh:users"));
    return Array.isArray(stored) ? stored : initialUsers;
  } catch {
    return initialUsers;
  }
}

// Helper: save users to localStorage
function saveUsers(users) {
  window.localStorage.setItem("clh:users", JSON.stringify(users));
}

// Helper: get or set logged-in user
function getLoggedInUser() {
  try {
    return JSON.parse(window.localStorage.getItem("clh:user")) || null;
  } catch {
    return null;
  }
}

function setLoggedInUser(user) {
  if (user) {
    window.localStorage.setItem("clh:user", JSON.stringify(user));
  } else {
    window.localStorage.removeItem("clh:user");
  }
}

// PUBLIC_INTERFACE
export function useAuth() {
  return useContext(AuthContext);
}

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  const [user, setUser] = useState(getLoggedInUser());
  const [users, setUsers] = useState(getStoredUsers());

  useEffect(() => {
    // update on mount
    setUsers(getStoredUsers());
    setUser(getLoggedInUser());
  }, []);

  function signup({ username, password, language }) {
    if (!username || !password || !language) return { success: false, message: "All fields required" };
    if (users.find((u) => u.username === username)) {
      return { success: false, message: "Username already exists" };
    }
    const newUser = { username, password, language };
    const newUsers = [...users, newUser];
    setUsers(newUsers);
    saveUsers(newUsers);
    setLoggedInUser(newUser);
    setUser(newUser);
    return { success: true, message: "Signup successful" };
  }

  function login({ username, password }) {
    const found = users.find((u) => u.username === username && u.password === password);
    if (!found) return { success: false, message: "Invalid credentials" };
    setLoggedInUser(found);
    setUser(found);
    return { success: true, message: "Login successful" };
  }

  function logout() {
    setLoggedInUser(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
