import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";

import { ToggleTheme } from "../components/ToggleTheme";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useLanguageContext } from "../context/LanguageContext";
import { suggestedCities } from "../data/suggestedCities";
import { SearchInput } from "../components/SearchInput";
import { useWeatherContext } from "../context/WeatherContext";
import { RecentSearches } from "../components/RecentSearches";

export function SearchPage() {
  const navigate = useNavigate();

  const {
    value: { t },
  } = useLanguageContext();
  const { searchCity } = useWeatherContext();

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
        <RecentSearches />
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
      </div>
    </section>
  );
}
