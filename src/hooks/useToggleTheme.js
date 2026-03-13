import { useEffect } from "react";

export function useToggleTheme(theme) {
  useEffect(() => {
    // add dark class to body when theme is true
    document.documentElement.classList.toggle("dark", theme);

    // store theme in localStorage
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);
}
