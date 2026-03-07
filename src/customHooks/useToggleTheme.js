import { useEffect } from "react";

export function useToggleTheme(theme) {
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);
}
