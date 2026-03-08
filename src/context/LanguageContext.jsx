import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { translations } from "../i18n/translations";

export const LanguageContext = createContext(null);

export const LanguageProvider = function ({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState(
    () => JSON.parse(localStorage.getItem("language")) || "en",
  );

  const dictionary = translations[currentLanguage] ?? "en";

  useEffect(() => {
    localStorage.setItem("language", JSON.stringify(currentLanguage));
  }, [currentLanguage]);

  const t = useCallback(
    (key, variables = {}) => {
      if (!key) return;

      const keys = key.split(".");

      let value = dictionary;

      for (let k of keys) {
        value = value?.[k];
      }

      if (typeof value !== "string") return key;

      Object.keys(variables).forEach((variable) => {
        value = value.replaceAll(`{{${variable}}}`, variables[variable]);
      });

      return value;
    },
    [dictionary],
  );

  const value = useMemo(
    () => ({ currentLanguage, setCurrentLanguage, t }),
    [currentLanguage, t],
  );

  return (
    <LanguageContext.Provider value={{ value }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = function () {
  const context = useContext(LanguageContext);

  if (!context)
    throw new Error("useLanguageContext must be within Language Provider");

  return context;
};
