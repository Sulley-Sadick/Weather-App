import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

import { useLocationContext } from "../context/LocationContext";
import { useLanguageContext } from "../context/LanguageContext";
import { useWeatherContext } from "../context/WeatherContext";
import { Spinner } from "./Spinner";
import { ErrorMessage } from "./ErrorMessage";

export function SearchInput() {
  const [inputValue, setInputValue] = useState("");
  const { geolocationLoading, retry, geolocationError } = useLocationContext();
  const { searchCity, loading, clearError, error, cityName } =
    useWeatherContext();
  const {
    value: { t },
  } = useLanguageContext();

  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setInputValue(e.target.value);

    clearError();
  };
  return (
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
      {error && (
        <ErrorMessage message={error} onRetry={() => searchCity(cityName)} />
      )}
      {geolocationError && (
        <ErrorMessage onRetry={() => retry()} message={geolocationError} />
      )}
    </form>
  );
}
