import { useLanguageContext } from "../context/LanguageContext";
import { useWeatherContext } from "../context/WeatherContext";

function HourlyForecast() {
  const { selectedWeather } = useWeatherContext();
  const {
    value: { t },
  } = useLanguageContext();
  return (
    <div className="flex-center flex-col">
      <h1 className="mb-2 text-3xl font-bold">
        {t("location.city", { city: selectedWeather.current.name })}
      </h1>
      <p>
        {t("similarLabels.chanceOfRain")}:{" "}
        {Math.round(selectedWeather.forecast.list[0].pop * 100)}%
      </p>
      <img
        className="mb-4 w-full"
        src={`https://openweathermap.org/img/wn/${selectedWeather.current.weather[0].icon}@2x.png`}
        alt={selectedWeather.current.weather[0].main}
      />
      <h3 className="mb-10 text-4xl font-black">
        {Math.round(selectedWeather.current.main.temp)}℃
      </h3>
    </div>
  );
}

export default HourlyForecast;
