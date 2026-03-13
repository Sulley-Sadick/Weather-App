import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";

import { ToggleTheme } from "../components/controls/ToggleTheme";
import { LanguageSwitcher } from "../components/controls/LanguageSwitcher";
import { SearchInput } from "../components/search/SearchInput";
import { RecentSearches } from "../components/search/RecentSearches";
import { SuggestedCities } from "../components/search/SuggestedCities";
import { PageTransition } from "../components/animations/PageTransition";

export function SearchPage() {
  const navigate = useNavigate();

  return (
    <PageTransition>
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
          <SuggestedCities />
        </div>
      </section>
    </PageTransition>
  );
}
