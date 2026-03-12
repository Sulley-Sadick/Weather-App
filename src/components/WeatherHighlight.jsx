import { useNavigate } from "react-router-dom";
import { PiThermometerSimpleBold } from "react-icons/pi";
import { FaWind } from "react-icons/fa";
import { IoWaterSharp, IoSettings } from "react-icons/io5";

import { useWeatherContext } from "../context/WeatherContext";
import { useLanguageContext } from "../context/LanguageContext";

export function WeatherHighlight() {
  const navigate = useNavigate();
  const { selectedWeather } = useWeatherContext();
  const {
    value: { t },
  } = useLanguageContext();

  return (
    <div className="mt-20 w-full rounded-md bg-gray-300 shadow-md max-sm:p-4 sm:p-6 md:w-[80%] dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">{t("dashboard.titles.weatherDetails")}</h3>
        <button
          type="button"
          className="cursor-pointer rounded-full bg-blue-500 py-2 font-bold text-white transition-all duration-400 hover:bg-blue-400 max-sm:px-2 sm:px-4"
          onClick={() => navigate("/weatherDetails")}
        >
          {t("dashboard.buttons.moreInfo")}
        </button>
      </div>
      <div className="flex-center my-5 max-sm:flex-col sm:flex-row">
        <div className="flex-center w-full flex-col">
          <div className="mt-4 flex">
            <PiThermometerSimpleBold className="text-3xl" />
            <p>
              {t("similarLabels.feelsLike")} <br />
              <span className="font-bold">
                {Math.round(selectedWeather.current.main.feels_like)}℃
              </span>
            </p>
          </div>
          <div className="mt-5 flex gap-2">
            <FaWind className="text-3xl" />
            <p>
              {t("dashboard.labels.breeze")} <br />
              <span className="font-bold">
                {selectedWeather.current.wind.speed} m/s
              </span>
            </p>
          </div>
        </div>
        <div className="flex-center mt-5 w-full flex-col">
          <div className="mb-5 flex gap-2">
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
              <span className="font-bold">N/A</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
