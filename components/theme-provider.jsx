"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/**
 * @typedef {"light" | "dark"} Theme
 *
 * @typedef {Object} ThemeContextValue
 * @property {Theme} theme Resolved theme actually applied to <html>.
 * @property {() => void} toggleTheme
 * @property {(theme: Theme) => void} setTheme
 */

const STORAGE_KEY = "portfolio-theme";

/** @type {import('react').Context<ThemeContextValue | undefined>} */
const ThemeContext = createContext(undefined);

/**
 * Reads the theme that the inline pre-hydration script (see <ThemeScript />)
 * has already applied to <html>, so React state starts in sync and we avoid a
 * flash of the wrong theme.
 *
 * @returns {Theme}
 */
function getInitialTheme() {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
}

/**
 * @param {Object} props
 * @param {import('react').ReactNode} props.children
 */
export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("light");

  // Sync state with the DOM after mount (the inline script ran before us).
  useEffect(() => {
    setThemeState(getInitialTheme());
  }, []);

  const applyTheme = useCallback((next) => {
    const root = document.documentElement;
    root.classList.toggle("dark", next === "dark");
    root.style.colorScheme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage may be unavailable; ignore */
    }
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    applyTheme(theme === "dark" ? "light" : "dark");
  }, [theme, applyTheme]);

  const value = useMemo(
    () => ({ theme, toggleTheme, setTheme: applyTheme }),
    [theme, toggleTheme, applyTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/**
 * @returns {ThemeContextValue}
 */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}

/**
 * Inline script injected in <head> before hydration. Resolves the stored or
 * system theme and sets the `dark` class synchronously to prevent FOUC.
 * Rendered via dangerouslySetInnerHTML because it must run before React.
 */
export function ThemeScript() {
  const script = `(function(){try{var k='${STORAGE_KEY}';var s=localStorage.getItem(k);var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=s||(m?'dark':'light');var e=document.documentElement;e.classList.toggle('dark',t==='dark');e.style.colorScheme=t;}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
