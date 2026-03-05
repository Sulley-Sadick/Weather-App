import { useEffect } from "react";

function useToggleTheme(theme) {
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);
}

export default useToggleTheme;
