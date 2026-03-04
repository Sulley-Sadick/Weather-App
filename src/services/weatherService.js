import { getJSON } from "./fetchers";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const weatherService = async function (city) {
  const data = await Promise.all([
    getJSON(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`,
    ),
    getJSON(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`,
    ),
  ]);

  return data;
};

export default weatherService;
