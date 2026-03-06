// hooks
import { createContext, useEffect, useState } from "react";

// created components
import weatherService from "../services/weatherService";
import {
  useLocalStorageForSelectedWeather,
  useLocalStorageForWeatherHistory,
} from "../customHooks/useLocalStorage";
import useToggleTheme from "../customHooks/useToggleTheme";

// create context
export const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  const [weatherHistory, setWeatherHistory] = useState(
    () => JSON.parse(localStorage.getItem("weatherHistory")) || [],
  );
  const [selectedWeather, setSelectedWeather] = useState(
    () => JSON.parse(localStorage.getItem("selectedWeather")) || null,
  );
  const [theme, setTheme] = useState(
    () => JSON.parse(localStorage.getItem("theme")) || false,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");

  // store weatherHistory into localStorage
  useLocalStorageForWeatherHistory(weatherHistory);

  // store selectedWeather into localStorage
  useLocalStorageForSelectedWeather(selectedWeather);

  // store theme in the localStorage
  useToggleTheme(theme);

  // change theme
  const changeTheme = () => setTheme(() => !theme);

  // add dark class to body when theme is true
  useEffect(() => {
    if (theme) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  // clear states
  const resetWeatherData = () => setWeatherHistory([]);

  const searchCity = async function (city) {
    try {
      // loading when fetching data
      setLoading(true);

      // update error before any request
      setError(null);

      // update city state
      setCity(city);

      // fetch data
      const [data, foreCastData] = await weatherService(city);

      const weatherObject = {
        current: data,
        foreCast: foreCastData,
      };

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

  return (
    <WeatherContext.Provider
      value={{
        loading,
        weatherHistory,
        selectedWeather,
        error,
        searchCity,
        resetWeatherData,
        theme,
        changeTheme,
        city,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
