import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";

import { useWeatherContext } from "../context/WeatherContext";
import { ToggleTheme } from "../components/ToggleTheme";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useLanguageContext } from "../context/LanguageContext";
import { suggestedCities } from "../data/suggestedCities";
import { SearchInput } from "../components/SearchInput";

export function SearchPage() {
  const navigate = useNavigate();

  const {
    value: { t },
  } = useLanguageContext();

  const { weatherHistory, clearWeatherHistory, searchCity } =
    useWeatherContext();

  const handleSearchCity = async function (city) {
    const success = await searchCity(city);
    if (success) navigate("/dashboard");
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

        <SearchInput />
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
