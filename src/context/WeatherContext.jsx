import { createContext, useState } from "react";
import weatherService from "../services/weatherService";
import {
  useLocalStorageForSelectedWeather,
  useLocalStorageForWeatherHistory,
} from "../customHooks/useLocalStorage";

// create context
export const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  const [weatherHistory, setWeatherHistory] = useState(
    () => JSON.parse(localStorage.getItem("weatherHistory")) || [],
  );
  const [selectedWeather, setSelectedWeather] = useState(
    () => JSON.parse(localStorage.getItem("selectedWeather")) || null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const resetWeatherData = () => setWeatherHistory([]);

  // store weatherHistory into localStorage
  useLocalStorageForWeatherHistory(weatherHistory);

  // store selectedWeather into localStorage
  useLocalStorageForSelectedWeather(selectedWeather);

  const searchCity = async function (city) {
    try {
      // loading when fetching data
      setLoading(true);

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
      // update loading to false when done fetching data
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
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
