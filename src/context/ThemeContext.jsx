import { createContext, useContext, useState } from "react";
import { useToggleTheme } from "../hooks/useToggleTheme";

export const ThemeContext = createContext(null);

export const ThemeProvider = function ({ children }) {
  const [theme, setTheme] = useState(
    () => JSON.parse(localStorage.getItem("theme")) || false,
  );

  // store theme in the localStorage
  useToggleTheme(theme);

  // change theme
  const changeTheme = () => setTheme(!theme);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = function () {
  const context = useContext(ThemeContext);

  if (!context)
    throw new Error("useThemeContext must be within Theme Provider");

  return context;
};
