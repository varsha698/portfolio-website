import { createContext, useContext, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";

const KEY = "vb-mode";
const ModeContext = createContext({ mode: "work", setMode: () => {}, toggle: () => {} });

export const ModeProvider = ({ children }) => {
  const [mode, setModeState] = useState("work");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "work" || saved === "personal") setModeState(saved);
    } catch { /* ignore */ }
  }, []);

  const setMode = useCallback((m) => {
    setModeState(m);
    try { localStorage.setItem(KEY, m); } catch { /* ignore */ }
  }, []);

  const toggle = useCallback(() => {
    setModeState((m) => {
      const next = m === "work" ? "personal" : "work";
      try { localStorage.setItem(KEY, next); } catch { /* ignore */ }
      return next;
    });
  }, []);

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
  }, [mode]);

  return (
    <ModeContext.Provider value={{ mode, setMode, toggle }}>
      {children}
    </ModeContext.Provider>
  );
};

ModeProvider.propTypes = { children: PropTypes.node };

export const useMode = () => useContext(ModeContext);
