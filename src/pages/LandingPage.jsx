import { useNavigate } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import { LuCloudSun } from "react-icons/lu";

import { ToggleTheme } from "../components/controls/ToggleTheme";
import { LanguageSwitcher } from "../components/controls/LanguageSwitcher";
import { PageTransition } from "../components/animations/PageTransition";
import { useLanguageContext } from "../context/LanguageContext";

export function LandingPage() {
  const navigate = useNavigate();
  const {
    value: { t },
  } = useLanguageContext();

  return (
    <PageTransition>
      <section className="min-h-screen w-full bg-white transition-all duration-300 ease-in-out dark:bg-gray-900 dark:text-gray-800">
        <div className="flex-center flex-col py-5">
          <div className="flex-center flex-col self-end">
            <ToggleTheme />
            <LanguageSwitcher />
          </div>
          <div className="mx-auto my-5">
            <LuCloudSun size={130} className="text-sky-500 dark:text-sky-400" />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex-center flex-col">
            <h1 className="mt-25 mb-4 flex flex-col items-center text-5xl font-black text-gray-800 sm:mt-10 dark:text-gray-100">
              {t("landing.title")}
            </h1>
            <span className="text-2xl font-medium text-gray-800 dark:text-gray-100">
              {t("landing.subtitle")}
            </span>
          </div>
          <div className="mr-11 flex flex-col items-center max-sm:mr-0">
            <button
              aria-label="Go to weather search"
              type="button"
              className="my-10 flex cursor-pointer flex-col items-center rounded-full bg-blue-600 p-1 text-2xl text-white transition-all duration-400 hover:bg-blue-500"
              onClick={() => navigate("/search")}
            >
              <GoArrowRight />
            </button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
