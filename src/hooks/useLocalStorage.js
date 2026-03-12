import { useEffect } from "react";

export function useLocalStorageForWeatherHistory(weatherHistory) {
  useEffect(() => {
    if (!weatherHistory.length) return;

    localStorage.setItem("weatherHistory", JSON.stringify(weatherHistory));
  }, [weatherHistory]);

  return weatherHistory;
}

export function useLocalStorageForSelectedWeather(selectedWeather) {
  useEffect(() => {
    localStorage.setItem("selectedWeather", JSON.stringify(selectedWeather));
  }, [selectedWeather]);
}

export function clearHistory() {
  localStorage.removeItem("weatherHistory");
}
