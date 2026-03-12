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
        <div className="mt-20 w-full rounded-md bg-gray-300 shadow-md max-sm:p-4 sm:p-6 md:w-[80%] dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">
              {t("dashboard.titles.weatherDetails")}
            </h3>
            <button
              type="button"
              className="cursor-pointer rounded-full bg-blue-500 py-2 font-bold text-white transition-all duration-400 hover:bg-blue-400 max-sm:px-2 sm:px-4"
              onClick={() => navigate("/weatherDetails")}
            >
              {t("dashboard.buttons.moreInfo")}
            </button>
          </div>
          <div className="flex-center my-5 max-sm:flex-col sm:flex-row">
            <div className="flex-center w-full flex-col">
              <div className="mt-4 flex">
                <PiThermometerSimpleBold className="text-3xl" />
                <p>
                  {t("similarLabels.feelsLike")} <br />
                  <span className="font-bold">
                    {Math.round(selectedWeather.current.main.feels_like)}℃
                  </span>
                </p>
              </div>
              <div className="mt-5 flex gap-2">
                <FaWind className="text-3xl" />
                <p>
                  {t("dashboard.labels.breeze")} <br />
                  <span className="font-bold">
                    {selectedWeather.current.wind.speed} m/s
                  </span>
                </p>
              </div>
            </div>
            <div className="flex-center mt-5 w-full flex-col">
              <div className="mb-5 flex gap-2">
                <IoWaterSharp className="text-3xl" />
                <p>
                  {t("dashboard.labels.precipitation")}
                  <br />
                  <span className="font-bold">
                    {Math.round(selectedWeather.forecast.list[0].pop * 100)} %
                  </span>
                </p>
              </div>
              <div className="-ml-3 flex gap-2">
                <IoSettings className="text-3xl" />
                <p>
                  {t("dashboard.labels.uvLevel")}
                  <br />
                  <span className="font-bold">N/A</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
