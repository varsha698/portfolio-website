import { useEffect, useState } from "react";

// "Render" is the normal filled site; "wireframe" strips fills down to
// outlines like a technical drawing (styles live in index.css under
// html[data-mode="wireframe"]). index.html applies the saved choice before
// first paint so there's no flash.

const KEY = "bp-mode";
const CHANGE = "bp:mode";

const readMode = () =>
  typeof document !== "undefined" && document.documentElement.dataset.mode === "wireframe"
    ? "wireframe"
    : "render";

export const setDrawingMode = (mode) => {
  const apply = () => {
    if (mode === "wireframe") document.documentElement.dataset.mode = "wireframe";
    else delete document.documentElement.dataset.mode;
    try {
      localStorage.setItem(KEY, mode);
    } catch {
      /* storage unavailable: the choice lasts for this page view */
    }
    window.dispatchEvent(new CustomEvent(CHANGE, { detail: mode }));
  };
  const calm = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  // A left-to-right wipe between the two drawings where the browser supports it.
  if (document.startViewTransition && !calm) document.startViewTransition(apply);
  else apply();
};

export const toggleDrawingMode = () =>
  setDrawingMode(readMode() === "wireframe" ? "render" : "wireframe");

export const useDrawingMode = () => {
  const [mode, setMode] = useState(readMode);
  useEffect(() => {
    const onChange = (e) => setMode(e.detail);
    window.addEventListener(CHANGE, onChange);
    return () => window.removeEventListener(CHANGE, onChange);
  }, []);
  return mode;
};
