import { getJSON } from "./fetchers";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeatherAndForeCastFromCity = async function (city) {
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

export const fetchWeatherAndForeCastFromCoordinates = async function (
  lat,
  lon,
) {
  const data = await Promise.all([
    getJSON(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
    ),
    getJSON(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
    ),
  ]);

  return data;
};
