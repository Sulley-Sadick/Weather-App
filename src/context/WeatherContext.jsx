import { createContext, useContext, useEffect, useState } from "react";

import {
  fetchWeatherAndForeCastByCity,
  fetchWeatherAndForeCastByCoordinates,
} from "../services/weatherService";
import {
  useLocalStorageForSelectedWeather,
  useLocalStorageForWeatherHistory,
  clearHistory,
} from "../hooks/useLocalStorage";
import { REFRESH_INTERVAL_MS } from "../config/appConfig";

// create context
export const WeatherContext = createContext(null);

export const WeatherProvider = ({ children }) => {
  const [weatherHistory, setWeatherHistory] = useState(() =>
    JSON.parse(localStorage.getItem("weatherHistory") || "[]"),
  );
  const [selectedWeather, setSelectedWeather] = useState(
    () => JSON.parse(localStorage.getItem("selectedWeather")) || null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cityName, setCityName] = useState("");
  const [hasAutoFetched, setHasAutoFetched] = useState(false);

  // clear weatherHistory
  const clearWeatherHistory = () => {
    setWeatherHistory([]);
    clearHistory();
  };

  const clearError = () => {
    setError(null);
  };

  // store weatherHistory into localStorage
  useLocalStorageForWeatherHistory(weatherHistory);

  // store selectedWeather into localStorage
  useLocalStorageForSelectedWeather(selectedWeather);

  const isDuplicate = (history, weatherObject) => {
    const exist = history.some(
      (h) => h.current.id === weatherObject.current.id,
    );

    if (exist) return history;

    return [...history, weatherObject];
  };

  const fetchWeatherByCoordinates = async (coordinates) => {
    try {
      const data = await fetchWeatherAndForeCastByCoordinates(
        coordinates.latitude,
        coordinates.longitude,
      );

      const [current, forecast] = data;

      const weatherObject = { current, forecast };

      setCityName(current.name);

      setWeatherHistory((prevHistory) =>
        isDuplicate(prevHistory, weatherObject),
      );

      setSelectedWeather(weatherObject);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const searchCity = async function (city) {
    try {
      // loading when fetching data
      setLoading(true);

      // update error before any request
      setError(null);

      // update city state
      setCityName(city);

      // fetch data
      const [current, forecast] = await fetchWeatherAndForeCastByCity(city);

      const weatherObject = { current, forecast };

      // weatherHistory
      setWeatherHistory((prevHistory) =>
        isDuplicate(prevHistory, weatherObject),
      );

      // selectedWeather
      setSelectedWeather(weatherObject);

      return true; // success message
    } catch (err) {
      setError(err.message);
      return false; // failure message
    } finally {
      // update loading to false when done fetching data or unable to fetch
      setLoading(false);
    }
  };

  // run after every 3minutes to update weather data
  useEffect(() => {
    if (!cityName) return;

    const interval = setInterval(async () => {
      await searchCity(cityName);
    }, REFRESH_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [cityName]);

  return (
    <WeatherContext.Provider
      value={{
        weatherHistory,
        selectedWeather,
        clearWeatherHistory,
        searchCity,
        clearError,
        cityName,
        loading,
        error,
        fetchWeatherByCoordinates,
        setHasAutoFetched,
        hasAutoFetched,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = function () {
  const context = useContext(WeatherContext);

  if (!context)
    throw new Error("useWeatherContext must be used within Weather Provider");
  return context;
};
