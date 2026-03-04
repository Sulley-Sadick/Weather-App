import { useEffect } from "react";

export function useLocalStorage(weatherData) {
  useEffect(() => {
    if (!weatherData.length) return;

    localStorage.setItem("city", JSON.stringify(weatherData));
  }, [weatherData]);

  return weatherData;
}
