import { useLanguageContext } from "../context/LanguageContext";
import { useWeatherContext } from "../context/WeatherContext";
import { suggestedCities } from "../data/suggestedCities";

export function SuggestedCities() {
  const { searchCity } = useWeatherContext();
  const {
    value: { t },
  } = useLanguageContext();

  return (
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
                onClick={() => searchCity(city.city)}
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
  );
}
