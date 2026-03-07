import { createContext, useEffect, useState } from "react";
import { useToggleTheme } from "../customHooks/useToggleTheme";

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => JSON.parse(localStorage.getItem("theme")) || false,
  );

  // store theme in the localStorage
  useToggleTheme(theme);

  // change theme
  const changeTheme = () => setTheme(() => !theme);

  // add dark class to body when theme is true
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
