import { useNavigate } from "react-router-dom";

import { PiThermometerSimpleBold } from "react-icons/pi";
import { FaWind } from "react-icons/fa";
import { IoSettings, IoWaterSharp } from "react-icons/io5";
import { GrPrevious } from "react-icons/gr";

import { useWeatherContext } from "../context/WeatherContext";
import { ToggleTheme } from "../components/ToggleTheme";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useLanguageContext } from "../context/LanguageContext";
import { HourlyForecast } from "../components/HourlyForecast";
import { WeeklyForecast } from "../components/WeeklyForecast";
import { WeatherHighlight } from "../components/WeatherHighlight";

export function Dashboard() {
  const { selectedWeather } = useWeatherContext();

  const {
    value: { t },
  } = useLanguageContext();

  const navigate = useNavigate();

  if (!selectedWeather) return <p>{t("weatherDataStatus.dataUnavailable")}</p>;

  return (
    <section className="min-h-screen w-full dark:bg-gray-900 dark:text-gray-100">
      <div className="flex-center w-full flex-col p-5">
        <div className="flex-center mb-10 w-full justify-between">
          <button
            className="cursor-pointer text-2xl"
            onClick={() => {
              navigate("/search");
            }}
            aria-label="Go back to search page"
          >
            <GrPrevious />
          </button>
          <div>
            <ToggleTheme />
            <LanguageSwitcher />
          </div>
        </div>
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
        <HourlyForecast />
        <WeeklyForecast />
        <WeatherHighlight />
      </div>
    </section>
  );
}
