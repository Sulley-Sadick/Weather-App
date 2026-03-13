import { useEffect } from "react";

export function useToggleTheme(theme) {
  useEffect(() => {
    const rootElement = document.documentElement;
    // add dark class to body when theme is true
    if (theme === "dark") {
      rootElement.classList.add("dark");
      rootElement.classList.remove("white");
    } else {
      rootElement.classList.remove("dark");
      rootElement.classList.add("white");
    }

    // store theme in localStorage
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);
}
