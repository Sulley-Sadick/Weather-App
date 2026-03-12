import { useNavigate } from "react-router-dom";
import { useLanguageContext } from "../context/LanguageContext";
import { useWeatherContext } from "../context/WeatherContext";

export function RecentSearches() {
  const navigate = useNavigate();

  const { weatherHistory, clearWeatherHistory, searchCity } =
    useWeatherContext();

  const {
    value: { t },
  } = useLanguageContext();

  return (
    <div>
      {!weatherHistory.length ? (
        <h3 className="mt-2 font-bold">{t("weatherDataStatus.noSearches")}</h3>
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
                onClick={async () => {
                  const success = await searchCity(city.current.name);
                  if (success) navigate("/dashboard");
                }}
              >
                <div>
                  <img
                    src={`https://openweathermap.org/img/wn/${city.current.weather[0].icon}@2x.png`}
                    alt={city.current.weather[0].main}
                  />
                </div>
                <div className="mt-4 text-left *:mb-1 md:self-start">
                  <h2 className="tex-red-500 font-bold">{city.current.name}</h2>
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
    </div>
  );
}
