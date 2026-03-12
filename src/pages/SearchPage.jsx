import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { GoArrowLeft } from "react-icons/go";
import { CiSearch } from "react-icons/ci";

import { useWeatherContext } from "../context/WeatherContext";
import { ToggleTheme } from "../components/ToggleTheme";
import { ErrorMessage } from "../components/ErrorMessage";
import { Spinner } from "../components/Spinner";
import { useLocationContext } from "../context/LocationContext";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useLanguageContext } from "../context/LanguageContext";
import { suggestedCities } from "../data/suggestedCities";

export function SearchPage() {
  const navigate = useNavigate();

  const {
    value: { t },
  } = useLanguageContext();

  const {
    weatherHistory,
    loading,
    clearError,
    error,
    cityName,
    clearWeatherHistory,
    searchCity,
  } = useWeatherContext();

  const { geolocationLoading, retry, geolocationError } = useLocationContext();

  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async function (e) {
    // prevent browser from automatically submitting the form
    e.preventDefault();

    // return when inputValue is undefined or null
    if (!inputValue.trim()) return;

    // pass inputValue to searchCity function when being called in WeatherContext.jsx
    const success = await searchCity(inputValue);

    // go to dashboard
    if (success) navigate("/dashboard");

    // clear input field
    setInputValue("");
  };

  const handleSearchCity = async function (city) {
    const success = await searchCity(city);
    if (success) navigate("/dashboard");
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);

    clearError();
  };

  return (
    <section className="min-h-screen w-full bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
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
          <div className="flex-center flex-col">
            <ToggleTheme />
            <LanguageSwitcher />
          </div>
        </div>
        <div>
          <form
            className="mt-4 mb-6 flex flex-col"
            onSubmit={handleSubmit}
            disabled={loading}
          >
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
                  onChange={handleChange}
                />
                <CiSearch className="absolute top-3 left-5 text-2xl text-gray-500" />
              </div>
              {(geolocationLoading || loading) && <Spinner />}
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
          <h3 className="mt-2 font-bold">
            {t("weatherDataStatus.noSearches")}
          </h3>
        ) : (
          <div className="flex-center mt-10 justify-between">
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
        <div className="mt-6 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {weatherHistory.map((city) => (
            <div
              className="flex-center flex-col rounded-md p-3 shadow-lg hover:scale-[1.1] dark:bg-gray-800"
              key={city.current.id}
            >
              <div className="flex gap-4 self-start">
                <button
                  className="flex cursor-pointer"
                  aria-label={t("accessibility.searchWeather")}
                  onClick={() => handleSearchCity(city.current.name)}
                >
                  <div>
                    <img
                      src={`https://openweathermap.org/img/wn/${city.current.weather[0].icon}@2x.png`}
                      alt={city.current.weather[0].main}
                    />
                  </div>
                  <div className="mt-4 text-left *:mb-1 md:self-start">
                    <h2 className="tex-red-500 font-bold">
                      {city.current.name}
                    </h2>
                    <h3 className="text-gray-400 dark:text-gray-100">
                      {t("search.weatherInCity", { city: city.current.name })}
                    </h3>
                    <div className="flex gap-4 font-medium">
                      <p>{Math.round(city.current.main.temp)}℃</p>
                      <p>
                        {t("weather.humidity")}: {city.current.main.humidity}%
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h3 className="mt-10 mb-5 text-center font-bold text-gray-900 sm:text-left dark:text-gray-100">
            {t("search.suggestedCities")}
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {suggestedCities.map((city) => (
              <div key={city.city} className="text-center sm:text-left">
                <div>
                  <button
                    role="button"
                    aria-label={t("accessibility.searchWeather")}
                    className="w-[50%] cursor-pointer"
                    onClick={() => handleSearchCity(city.city)}
                  >
                    <div className="flex justify-center gap-4 sm:justify-normal">
                      <h3 className="sm:text-left">{city.country}</h3>
                      <h2 className="font-bold">{city.city}</h2>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
