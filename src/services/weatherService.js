const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const weatherService = async function (city) {
  const response = await Promise.all([
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`,
    ),
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`,
    ),
  ]);

  if (!response[0].ok || !response[1])
    throw new Error(
      "City not found, Please check your spellings and try again",
    );

  const data = await Promise.all(response.map((d) => d.json()));

  return data;
};

export default weatherService;
