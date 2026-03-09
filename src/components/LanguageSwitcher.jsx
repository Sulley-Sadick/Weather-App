import { useLanguageContext } from "../context/LanguageContext";

export function LanguageSwitcher() {
  const {
    value: { setCurrentLanguage },
    value: { t },
    value: { currentLanguage },
  } = useLanguageContext();

  const handleChange = (e) => {
    setCurrentLanguage(e.target.value);
  };

  return (
    <div className="flex-center flex-col self-end">
      <label
        htmlFor="selectLanguage"
        className="mb-1 font-semibold text-gray-900 dark:text-gray-100"
      >
        {t("buttons.selectLanguage")}
      </label>
      <select
        className="animate-pulse cursor-pointer rounded-md border p-2 text-gray-900 dark:border-gray-100 dark:text-gray-100"
        onChange={handleChange}
        name="Language"
        value={currentLanguage}
        id="selectLanguage"
        aria-label="select language"
      >
        <option value="en" className="text-gray-900">
          English
        </option>
        <option value="es" className="text-gray-900">
          Spanish
        </option>
        <option value="de" className="text-gray-900">
          German
        </option>
        <option value="fr" className="text-gray-900">
          French
        </option>
      </select>
    </div>
  );
}
