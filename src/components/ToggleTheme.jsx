import { useLanguageContext } from "../context/LanguageContext";
import { useThemeContext } from "../context/ThemeContext";

export function ToggleTheme() {
  const { theme, changeTheme } = useThemeContext();
  const {
    value: { t },
  } = useLanguageContext();

  return (
    <div className="flex-center self-end">
      <p className="font-bold text-gray-800 dark:text-gray-100">
        {t("buttons.toggleTheme.view")}{" "}
        {!theme
          ? t("buttons.toggleTheme.dark")
          : t("buttons.toggleTheme.white")}{" "}
        {t("buttons.toggleTheme.theme")}
      </p>
      <button
        type="button"
        role="switch"
        aria-label="ToggleTheme"
        className={`m-4 h-6 w-11 cursor-pointer rounded-full bg-gray-400 p-1 outline-none`}
        onClick={changeTheme}
      >
        <span
          className={`block h-4 ${theme ? "translate-x-5" : "translate-0"} w-4 rounded-full bg-gray-900 transition-transform duration-400 dark:bg-white`}
        ></span>
      </button>
    </div>
  );
}
