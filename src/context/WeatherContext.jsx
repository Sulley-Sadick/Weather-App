import { createContext, useEffect, useState } from "react";
import weatherService from "../services/weatherService";
import { useLocalStorage } from "../customHooks/useLocalStorage";

// create context
export const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(
    () => JSON.parse(localStorage.getItem("city")) || [],
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const resetWeatherData = () => setWeatherData([]);

  // store weatherData into localStorage
  useLocalStorage(weatherData);

  const searchCity = async function (city) {
    try {
      // loading when fetching data
      setLoading(true);

      // fetch data
      const [current, foreCast] = await weatherService(city);

      setWeatherData((prev) => {
        const exist = prev.some((item) => item.current.id === current.id);

        if (exist) return prev;

        return [...prev, { current, foreCast }];
      });

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
      value={{ loading, weatherData, error, searchCity, resetWeatherData }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
