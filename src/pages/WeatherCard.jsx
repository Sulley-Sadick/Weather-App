// hooks
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// in-built components
import { PiThermometerSimpleBold } from "react-icons/pi";
import { FaWind } from "react-icons/fa";
import { IoSettings, IoWaterSharp } from "react-icons/io5";
import { GrPrevious } from "react-icons/gr";

// created components
import BottomNavBar from "../components/BottomNavBar";
import { WeatherContext } from "../context/WeatherContext";
import ToggleTheme from "../components/ToggleTheme";

function WeatherCard() {
  const { selectedWeather } = useContext(WeatherContext);

  const navigate = useNavigate();

  if (!selectedWeather) return <p>Data not available</p>;

  const weeklyData = selectedWeather.foreCast.list.filter((numDays) =>
    numDays.dt_txt.includes("12:00"),
  );

  return (
    <section className="min-h-screen w-full dark:bg-gray-900 dark:text-gray-100">
      <div className="flex-center mb-12 w-full flex-col p-5">
        <div className="mb-10 flex w-full items-center justify-between">
          <button
            className="cursor-pointer text-2xl"
            onClick={() => navigate("/search")}
            aria-label="Go back"
          >
            <GrPrevious />
          </button>
          <ToggleTheme />
        </div>
        <div className="flex-center flex-col">
          <h1 className="mb-2 text-3xl font-bold">
            {selectedWeather.current.name}
          </h1>
          <p>
            Chance of rain:
            {Math.round(selectedWeather.foreCast.list[0].pop * 100)}%
          </p>
          <img
            className="mb-4 w-full"
            src={`https://openweathermap.org/img/wn/${selectedWeather.current.weather[0].icon}@2x.png`}
            alt={selectedWeather.current.weather[0].main}
          />
          <h3 className="mb-10 text-4xl font-black">
            {Math.round(selectedWeather.current.main.temp)}℃
          </h3>
        </div>
        <div className="w-full rounded-md p-4 shadow-md md:w-[80%] dark:bg-gray-800">
          <h3 className="my-4 font-bold max-sm:text-center sm:text-left">
            Today's Weather
          </h3>
          <div className="flex divide-y divide-gray-900 max-sm:flex-col max-sm:items-center sm:divide-x sm:divide-y-0 md:flex-row md:justify-between dark:divide-gray-700">
            {selectedWeather.foreCast.list.slice(0, 3).map((weather) => (
              <div
                key={weather.dt_txt}
                className="flex-center w-full flex-col pr-25 max-sm:p-0"
              >
                <h2 className="text-center font-bold">
                  {weather.dt_txt.split(" ")[1].slice(0, -3)} Hours
                </h2>
                <img
                  className="w-[50%]"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt=""
                />
                <h3 className="my-2 font-bold">
                  {Math.round(weather.main.temp)}℃
                </h3>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-20 w-full rounded-lg p-6 shadow-md md:w-[80%] dark:bg-gray-800">
          <h3 className="my-2 font-bold max-sm:text-center sm:text-left">
            Weekly outlook
          </h3>
          <div className="w-full divide-y">
            {weeklyData.map((weather, index) => (
              <div key={weather.dt_txt}>
                <div className="flex-center justify-between max-sm:flex-col md:flex-row">
                  <p className="font-medium">
                    {index === 0
                      ? "Today"
                      : new Date(weather.dt_txt).toLocaleString("en-Us", {
                          weekday: "short",
                        })}
                  </p>
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].main}
                  />
                  <span className="font-bold">{weather.weather[0].main}</span>
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
        <div className="mt-20 w-full shadow-md max-sm:p-4 sm:p-6 md:w-[80%] dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Weather details</h3>
            <button
              type="button"
              className="cursor-pointer rounded-full bg-blue-500 py-2 font-bold text-white transition-all duration-400 hover:bg-blue-400 max-sm:px-2 sm:px-4"
              onClick={() => navigate("/details")}
            >
              More info
            </button>
          </div>
          <div className="flex-center my-5 max-sm:flex-col sm:flex-row">
            <div className="flex-center w-full flex-col">
              <div className="gap- mt-4 flex">
                <PiThermometerSimpleBold className="text-3xl" />
                <p>
                  Feels like <br />
                  <span className="font-bold">
                    {Math.round(selectedWeather.current.main.feels_like)}℃
                  </span>
                </p>
              </div>
              <div className="mt-5 flex gap-2">
                <FaWind className="text-3xl" />
                <p>
                  Breeze <br />
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
                  Precipitation <br />
                  <span className="font-bold">
                    {Math.round(selectedWeather.foreCast.list[0].pop * 100)} %
                  </span>
                </p>
              </div>
              <div className="-ml-3 flex gap-2">
                <IoSettings className="text-3xl" />
                <p>
                  UV level
                  <br />
                  <span className="font-bold">
                    {Math.round(
                      selectedWeather.foreCast.list[0].visibility / 100,
                    )}
                    k/m
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNavBar />
    </section>
  );
}

export default WeatherCard;
