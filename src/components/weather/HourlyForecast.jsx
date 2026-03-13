import { useLanguageContext } from "../../context/LanguageContext";
import { useWeatherContext } from "../../context/WeatherContext";

export function HourlyForecast() {
  const { selectedWeather } = useWeatherContext();
  const {
    value: { t },
  } = useLanguageContext();
  return (
    <div className="w-full rounded-md bg-gray-300 p-4 shadow-md md:w-[80%] dark:bg-gray-800">
      <h3 className="my-4 font-bold max-sm:text-center sm:text-left">
        {t("dashboard.titles.todaysWeather")}
      </h3>
      <div className="flex divide-y divide-gray-900 max-sm:flex-col max-sm:items-center sm:divide-x sm:divide-y-0 md:flex-row md:justify-between dark:divide-gray-700">
        {selectedWeather.forecast.list.slice(0, 3).map((weather) => (
          <div
            key={weather.dt_txt}
            className="flex-center w-full flex-col pr-25 max-sm:p-0"
          >
            <h2 className="text-center font-bold">
              {weather.dt_txt.split(" ")[1].slice(0, -3)}{" "}
              {t("dashboard.forecast.dayHours")}
            </h2>
            <img
              className="w-[50%]"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt=""
            />
            <h3 className="my-2 font-bold">{Math.round(weather.main.temp)}℃</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
