import { createContext, useState } from "react";
import weatherService from "../services/weatherService";

// create context
export const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchCity = async function (city) {
    try {
      // loading when fetching data
      setLoading(true);

      // fetch data
      const [current, foreCast] = await weatherService(city);

      setData({ current, foreCast });

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
    <WeatherContext.Provider value={{ loading, data, error, searchCity }}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
