import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { GoArrowLeft } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { FaCloud } from "react-icons/fa";

import { BottomNavBar } from "../components/BottomNavBar";
import { useWeatherContext } from "../context/WeatherContext";
import { ToggleTheme } from "../components/ToggleTheme";
import { ErrorMessage } from "../components/ErrorMessage";
import { Spinner } from "../components/Spinner";
import { useLocationContext } from "../context/LocationContext";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useLanguageContext } from "../context/LanguageContext";

export function SearchPage() {
  const navigate = useNavigate();

  const {
    value: { t },
  } = useLanguageContext();

  const {
    weatherHistory,
    loading,
    error,
    cityName,
    clearWeatherHistory,
    selectedWeather,
    searchCity,
  } = useWeatherContext();

  const { geolocationLoading, retry, geolocationError } = useLocationContext();

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!geolocationLoading && selectedWeather) navigate("/weathercard");
  }, [navigate, selectedWeather, geolocationLoading]);

  const handleSubmit = async function (e) {
    // prevent browser from automatically submitting the form
    e.preventDefault();

    // return when inputValue is undefined or null
    if (!inputValue.trim()) return;

    // update value using setInputValue
    setInputValue(inputValue);

    // pass inputValue to searchCity function when being called in WeatherContext.jsx
    const success = await searchCity(inputValue);

    // go to weathercard
    if (success) navigate("/weathercard");

    // clear input field
    setInputValue("");
  };

  return (
    <section className="mb-12 min-h-screen w-full bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <div className="p-6">
        <div className="flex-center justify-between">
          <button
            className="cursor-pointer text-3xl font-normal"
            type="button"
            aria-label="Go back to landing page"
            onClick={() => navigate("/")}
          >
            <GoArrowLeft />
          </button>
          <div>
            <ToggleTheme />
            <LanguageSwitcher />
          </div>
        </div>
        <div>
          <form className="mt-4 mb-6 flex flex-col" onSubmit={handleSubmit}>
            <label htmlFor="search" className="text-4xl font-bold">
              {t("search.title")}
            </label>
            <div className="flex-center gap-20">
              <div className="relative my-4 w-full rounded-full p-2 shadow-[5px_5px_20px_rgba(0,0,0,0.2)] sm:max-w-[50%]">
                <input
                  className="flex-center w-full rounded-md pt-0.5 pr-2 pl-10 font-medium text-gray-800 shadow-2xl outline-none focus:rounded-md dark:bg-gray-800 dark:text-gray-100"
                  type="search"
                  placeholder={t("search.placeholder")}
                  name="search"
                  id="search"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <CiSearch className="absolute top-3 left-5 text-2xl text-gray-500" />
              </div>
              {geolocationLoading && <Spinner />}
              {loading && <Spinner />}
            </div>
          </form>
          {error && (
            <ErrorMessage
              message={error}
              onRetry={() => searchCity(cityName)}
            />
          )}
          {geolocationError && (
            <ErrorMessage onRetry={() => retry()} message={geolocationError} />
          )}
        </div>
        {!weatherHistory.length ? (
          ""
        ) : (
          <div className="flex-center mt-10 max-sm:justify-between md:justify-normal md:gap-61">
            <h2 className="font-bold text-gray-900 dark:text-gray-100">
              {t("search.recentSearches")}
            </h2>

            <button
              type="button"
              aria-label={t("accessibility.clearWeatherHistory")}
              className="cursor-pointer font-semibold hover:underline"
              onClick={clearWeatherHistory}
            >
              {t("search.clearHistory")}
            </button>
          </div>
        )}
        <div className="mt-5 flex flex-col max-sm:gap-5 sm:gap-20 md:flex-row">
          {weatherHistory.slice(0, 2).map((city) => (
            <div className="flex-center flex-col" key={city.current.id}>
              <button
                className="cursor-pointer"
                role="search"
                aria-label={t("accessibility.searchWeather")}
                onClick={async () => {
                  const success = await searchCity(city.current.name);
                  if (success) navigate("/weathercard");
                }}
              >
                <div className="flex justify-center">
                  <img
                    src={`https://openweathermap.org/img/wn/${city.current.weather[0].icon}@2x.png`}
                    alt={city.current.weather[0].main}
                  />
                </div>
                <div className="md:self-start">
                  <h3 className="mt-2 font-medium text-gray-900 dark:text-gray-100">
                    {t("search.weatherInCity", { city: city.current.name })}
                  </h3>
                </div>
              </button>
            </div>
          ))}
        </div>
        <div>
          {!weatherHistory.length ? (
            ""
          ) : (
            <h3 className="mt-10 mb-5 font-bold text-gray-900 dark:text-gray-100">
              {t("search.suggestedCities")}
            </h3>
          )}
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {weatherHistory.slice(0, 5).map((city) => (
              <div key={city.current.id}>
                <div className="flex gap-4">
                  <button
                    role="button"
                    tabIndex={0}
                    aria-label={t("accessibility.searchWeather")}
                    className="cursor-pointer"
                    onClick={async () => {
                      const success = await searchCity(city.current.name);
                      if (success) navigate("/weathercard");
                    }}
                  >
                    <div>
                      <img
                        src={`https://openweathermap.org/img/wn/${city.current.weather[0].icon}@2x.png`}
                        alt={city.current.weather[0].main}
                      />
                    </div>
                  </button>
                  <div>
                    <h3 className="text-gray-900 dark:text-gray-100">
                      {t("location.city", { city: city.current.name })}
                    </h3>
                    <p className="text-gray-800 dark:text-gray-100">
                      {t("search.weatherInCity", { city: city.current.name })}
                    </p>
                    <div className="flex-center gap-2">
                      <FaCloud />
                      <span> {Math.round(city.current.main.temp)}</span>
                      <span className="text-gray-400">
                        {t("weather.humidity")}:{" "}
                        {Math.round(city.current.main.humidity)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNavBar />
    </section>
  );
}
