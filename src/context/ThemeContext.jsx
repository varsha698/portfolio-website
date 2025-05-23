import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const availableThemes = ["light", "dark", "retro", "neon", "pastel"];
  const systemPref = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const defaultTheme = localStorage.getItem("theme") || systemPref;
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextIndex = (availableThemes.indexOf(theme) + 1) % availableThemes.length;
    setTheme(availableThemes[nextIndex]);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
