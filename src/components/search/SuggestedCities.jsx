import { useNavigate } from "react-router-dom";
import { useLanguageContext } from "../../context/LanguageContext";
import { useWeatherContext } from "../../context/WeatherContext";
import { suggestedCities } from "../../data/suggestedCities";

export function SuggestedCities() {
  const { searchCity } = useWeatherContext();
  const navigate = useNavigate();
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
          <button
            key={city.city}
            role="button"
            aria-label={t("accessibility.searchWeather")}
            className="w-full cursor-pointer transition-transform duration-300 hover:scale-[1.05]"
            onClick={async () => {
              const success = searchCity(city.city);
              if (success) navigate("/dashboard");
            }}
          >
            <div
              key={city.city}
              className="rounded-md bg-gray-300 p-3 text-center shadow-md sm:text-left dark:bg-gray-800"
            >
              <div className="flex justify-center gap-4 sm:justify-normal">
                <h3 className="sm:text-left">{city.country}</h3>
                <h2 className="font-bold">{city.city}</h2>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
