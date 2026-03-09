import { createContext, useContext, useEffect, useState } from "react";

import {
  fetchWeatherAndForeCastFromCity,
  fetchWeatherAndForeCastFromCoordinates,
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
  const { coordinates, setGeolocationError } = useLocationContext();
  const [weatherHistory, setWeatherHistory] = useState(() =>
    JSON.parse(localStorage.getItem("weatherHistory") || "[]"),
  );
  const [selectedWeather, setSelectedWeather] = useState(
    () => JSON.parse(localStorage.getItem("selectedWeather")) || null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cityName, setCityName] = useState("");

  const isDuplicate = (history, weatherObject) => {
    const exist = history.some(
      (item) => item.current.id === weatherObject.current.id,
    );

    if (exist) return history;

    return [...history, weatherObject];
  };

  useEffect(() => {
    if (!coordinates) return;

    const fetchWeatherFromCoordinates = async () => {
      try {
        const data = await fetchWeatherAndForeCastFromCoordinates(
          coordinates.latitude,
          coordinates.longitude,
        );

        const [current, forecast] = data;

        const weatherObject = { current, forecast };

        setWeatherHistory((prevHistory) =>
          isDuplicate(prevHistory, weatherObject),
        );

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
    setGeolocationError(null);
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
      setCityName(city);

      // fetch data
      const [current, forecast] = await fetchWeatherAndForeCastFromCity(city);

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

  // run after every 5minutes to update weather data
  useEffect(() => {
    if (!cityName) return;

    const interval = setInterval(async () => {
      await searchCity(cityName);
    }, REFRESH_INTERVAL_MS);

    return () => clearInterval(interval);
  });

  return (
    <WeatherContext.Provider
      value={{
        weatherHistory,
        selectedWeather,
        clearWeatherHistory,
        clearSelectedWeather,
        searchCity,
        cityName,
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
    throw new Error("weatherContext must be used within Weather Provider");
  return context;
};
