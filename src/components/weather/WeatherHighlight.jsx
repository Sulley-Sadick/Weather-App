import { useNavigate } from "react-router-dom";
import { PiThermometerSimpleBold } from "react-icons/pi";
import { FaWind } from "react-icons/fa";
import { IoWaterSharp, IoSettings } from "react-icons/io5";

import { useWeatherContext } from "../../context/WeatherContext";
import { useLanguageContext } from "../../context/LanguageContext";

export function WeatherHighlight() {
  const navigate = useNavigate();
  const { selectedWeather } = useWeatherContext();
  const {
    value: { t },
  } = useLanguageContext();

  return (
    <div className="w-full rounded-md bg-gray-300 p-4 shadow-md dark:bg-gray-800">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-bold">{t("dashboard.titles.weatherDetails")}</h3>
        <button
          type="button"
          className="cursor-pointer rounded-full bg-blue-500 py-2 font-bold text-white transition-all duration-400 hover:bg-blue-400 max-sm:px-2 sm:px-4"
          onClick={() => navigate("/weatherDetails")}
        >
          {t("dashboard.buttons.moreInfo")}
        </button>
      </div>
      <div className="mb-5 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="mt-4 flex sm:mt-0">
          <PiThermometerSimpleBold className="text-3xl" />
          <p>
            {t("similarLabels.feelsLike")} <br />
            <span className="font-bold">
              {Math.round(selectedWeather.current.main.feels_like)}℃
            </span>
          </p>
        </div>
        <div className="mt-5 mb-5 flex gap-2 sm:mt-0 sm:mb-0">
          <FaWind className="text-3xl" />
          <p>
            {t("dashboard.labels.breeze")} <br />
            <span className="font-bold">
              {selectedWeather.current.wind.speed} m/s
            </span>
          </p>
        </div>
        <div className="mb-5 flex gap-2 sm:mb-0">
          <IoWaterSharp className="text-3xl" />
          <p>
            {t("dashboard.labels.precipitation")}
            <br />
            <span className="font-bold">
              {Math.round(selectedWeather.forecast.list[0].pop * 100)} %
            </span>
          </p>
        </div>
        <div className="-ml-3 flex gap-2">
          <IoSettings className="text-3xl" />
          <p>
            {t("dashboard.labels.uvLevel")}
            <br />
            <span className="font-bold">
              {Math.round(selectedWeather.current.visibility / 1000)} k/m
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
