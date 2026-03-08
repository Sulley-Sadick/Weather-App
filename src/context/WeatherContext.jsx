import { createContext, useContext, useEffect, useState } from "react";

import {
  fetchWeatherAndForeCastByCity,
  fetchWeatherAndForeCastByCoordinates,
} from "../services/weatherService";
import {
  useLocalStorageForSelectedWeather,
  useLocalStorageForWeatherHistory,
} from "../hooks/useLocalStorage";
import { useLocationContext } from "./LocationContext";
import { REFRESH_INTERVAL_MS } from "../../config";

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
  const [city, setCity] = useState("");

  const { coordinates } = useLocationContext();

  useEffect(() => {
    if (!coordinates) return;

    const fetchWeatherFromCoordinates = async () => {
      try {
        const data = await fetchWeatherAndForeCastByCoordinates(
          coordinates.latitude,
          coordinates.longitude,
        );

        const [current, forecast] = data;

        const weatherObject = { current, forecast };

        setWeatherHistory((prev) => {
          const exist = prev.some(
            (item) => item.current.id === weatherObject.current.id,
          );

          if (exist) return prev;

          return [...prev, weatherObject];
        });

        setSelectedWeather(weatherObject);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWeatherFromCoordinates();
  }, [coordinates]);

  // store weatherHistory into localStorage
  useLocalStorageForWeatherHistory(weatherHistory);

  // store selectedWeather into localStorage
  useLocalStorageForSelectedWeather(selectedWeather);

  // clear weatherHistory
  const clearWeatherHistory = () => {
    localStorage.removeItem("weatherHistory");
    setWeatherHistory([]);
  };

  const clearSelectedWeather = () => {
    setSelectedWeather(null);
    localStorage.removeItem("selectedWeather");
  };

  const searchCity = async function (city) {
    try {
      // loading when fetching data
      setLoading(true);

      // update error before any request
      setError(null);

      // update city state
      setCity(city);

      // fetch data
      const [current, forecast] = await fetchWeatherAndForeCastByCity(city);

      const weatherObject = { current, forecast };

      // weatherHistory
      setWeatherHistory((prev) => {
        const exist = prev.some(
          (item) => item.current.id === weatherObject.current.id,
        );

        if (exist) return prev;

        return [...prev, weatherObject];
      });

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
    if (!city) return;

    const interval = setInterval(async () => {
      await searchCity(city);
    }, REFRESH_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [city]);

  return (
    <WeatherContext.Provider
      value={{
        weatherHistory,
        selectedWeather,
        clearWeatherHistory,
        clearSelectedWeather,
        searchCity,
        city,
        loading,
        error,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = function () {
  const context = useContext(WeatherContext);

  if (!context)
    throw new Error("weatherContext must be within Weather Provider");
  return context;
};
