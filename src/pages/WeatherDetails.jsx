import { GrPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

import { LanguageSwitcher } from "../components/controls/LanguageSwitcher";
import { ToggleTheme } from "../components/controls/ToggleTheme";
import { PageTransition } from "../components/animations/PageTransition";
import { useWeatherContext } from "../context/WeatherContext";
import { useLanguageContext } from "../context/LanguageContext";

export function WeatherDetails() {
  const navigate = useNavigate();
  const {
    value: { t },
  } = useLanguageContext();

  const { selectedWeather } = useWeatherContext();

  if (!selectedWeather) return <p>{t("weatherDataStatus.dataUnavailable")}</p>;

  return (
    <PageTransition>
      <section className="min-h-screen w-full transition-all duration-300 ease-in-out dark:bg-gray-900 dark:text-gray-100">
        <div className="flex-center w-full flex-col justify-center p-6">
          <div className="flex-center w-full justify-between">
            <button
              type="button"
              aria-label="Go back to weather card"
              className="ml-2 flex cursor-pointer text-2xl"
              onClick={() => navigate("/dashboard")}
            >
              <GrPrevious />
            </button>
            <div>
              <ToggleTheme />
              <LanguageSwitcher />
            </div>
          </div>
          <h2 className="mt-10 flex text-[1rem] font-black sm:text-2xl">
            {t("weatherDetails.title")}
          </h2>
          <div className="flex-center mt-8 flex-col">
            <h1 className="mb-4 text-4xl font-black">
              {selectedWeather.current.name}
            </h1>
            <p>
              {t("similarLabels.chanceOfRain")}:{" "}
              {Math.round(selectedWeather.forecast.list[0].pop * 100)}%
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${selectedWeather.current.weather[0].icon}@2x.png`}
              alt={selectedWeather.current.weather[0].main}
            />
            <h3 className="text-4xl font-black">
              {Math.round(selectedWeather.current.main.temp)}℃
            </h3>
          </div>
          <div className="mt-15 grid grid-cols-2 gap-4">
            <div className="box-container">
              <p className="mb-2">{t("weatherDetails.labels.uvIndex")}</p>
              <span className="text-2xl font-bold">N/A</span>
            </div>
            <div className="box-container">
              <p className="mb-2">{t("weatherDetails.labels.windSpeed")}</p>
              <span className="text-2xl font-bold">
                {Math.round(selectedWeather.current.wind.speed)}m/s
              </span>
            </div>
            <div className="box-container">
              <p className="mb-2">{t("weather.humidity")}</p>
              <span className="text-2xl font-bold">
                {Math.round(selectedWeather.current.main.humidity)}%
              </span>
            </div>
            <div className="box-container">
              <p className="mb-2">{t("weatherDetails.labels.visibility")}</p>
              <span className="text-2xl font-bold">
                {selectedWeather.current.visibility / 1000}k/m
              </span>
            </div>
            <div className="box-container">
              <p className="mb-2">{t("similarLabels.feelsLike")}</p>
              <span className="text-2xl font-bold">
                {Math.round(selectedWeather.current.main.feels_like)}℃
              </span>
            </div>
            <div className="box-container">
              <p className="mb-2">{t("similarLabels.chanceOfRain")}</p>
              <span className="text-2xl font-bold">
                {Math.round(selectedWeather.forecast.list[0].pop * 100)}%
              </span>
            </div>
            <div className="box-container">
              <p className="mb-2">{t("weatherDetails.labels.pressure")}</p>
              <span className="text-2xl font-bold">
                {selectedWeather.current.main.pressure} hPa
              </span>
            </div>
            <div className="box-container">
              <p className="mb-2">{t("weatherDetails.labels.sunset")}</p>
              <span className="text-2xl font-bold">
                {new Date(
                  selectedWeather.current.sys.sunset * 1000,
                ).toLocaleTimeString("en-Us", {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
