import { useLanguageContext } from "../../context/LanguageContext";
import { useWeatherContext } from "../../context/WeatherContext";

export function WeeklyForecast() {
  const { selectedWeather } = useWeatherContext();
  const {
    value: { t },
    value: { currentLanguage },
  } = useLanguageContext();

  const weeklyData = selectedWeather.forecast.list.filter((numDays) =>
    numDays.dt_txt.includes("12:00"),
  );
  return (
    <div className="mt-20 w-full rounded-lg bg-gray-300 p-6 shadow-md md:w-[80%] dark:bg-gray-800">
      <h3 className="my-2 font-bold max-sm:text-center sm:text-left">
        {t("dashboard.titles.weeklyOutlook")}
      </h3>
      <div className="w-full divide-y">
        {weeklyData.map((weather, index) => (
          <div key={weather.dt_txt}>
            <div className="flex-center justify-between max-sm:flex-col md:flex-row">
              <p className="font-medium">
                {index === 0
                  ? t("dashboard.forecast.today")
                  : new Date(weather.dt_txt).toLocaleString(currentLanguage, {
                      weekday: "short",
                    })}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].main}
              />
              <span className="font-bold">
                {t(`weatherConditions.${weather.weather[0].main}`)}
              </span>
              <p className="font-semibold">
                {Math.round(weather.main.temp_max)} /
                <span className="font-normal">
                  {Math.round(weather.main.temp_min)}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
