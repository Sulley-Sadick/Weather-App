import { useNavigate } from "react-router-dom";
import { useLanguageContext } from "../../context/LanguageContext";
import { useWeatherContext } from "../../context/WeatherContext";

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
        {weatherHistory.slice(0, 3).map((city) => (
          <div className="flex-center flex-col" key={city.current.id}>
            <button
              className="flex w-full cursor-pointer self-start rounded-md bg-gray-300 p-4 shadow-lg transition-transform duration-300 hover:scale-[1.1] dark:bg-gray-800"
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
              <div className="mt-4 text-left md:self-start">
                <h2 className="tex-red-500 font-bold">{city.current.name}</h2>
                <h3 className="dark:text-gray-100">
                  {t("search.weatherInCity", { city: city.current.name })}
                </h3>
                <div className="flex gap-3 font-medium">
                  <p>{Math.round(city.current.main.temp)}℃</p>
                  <p>
                    {t("weather.humidity")}: {city.current.main.humidity}%
                  </p>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
