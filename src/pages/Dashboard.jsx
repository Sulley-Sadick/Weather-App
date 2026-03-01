import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

import { PiThermometerSimpleBold } from "react-icons/pi";
import { FaWind } from "react-icons/fa";
import { IoSettings, IoWaterSharp } from "react-icons/io5";

import BottomNavBar from "../components/BottomNavBar";

function Dashboard() {
  const { data } = useContext(WeatherContext);

  if (!data) return <p>Data not available</p>;

  const { current, foreCast } = data;

  const weeklyData = foreCast.list.filter((numDays) =>
    numDays.dt_txt.includes("12:00"),
  );

  return (
    <section>
      <div className="flex-center mb-20 w-full flex-col p-10">
        <div className="flex-center flex-col">
          <h1 className="text-3xl font-bold">{current.name}</h1>
          <p>Chance of rain: {foreCast.list[0].pop * 100}%</p>
          <img
            className="mb-4 w-full"
            src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
            alt={current.weather[0].main}
          />
          <h3 className="mb-10 text-4xl font-black">
            {Math.round(current.main.temp)}℃
          </h3>
        </div>
        <div className="w-full rounded-md p-4 shadow-md md:w-[80%]">
          <h3 className="my-4 font-bold max-sm:text-center sm:text-left">
            Today's Weather
          </h3>
          <div className="flex max-sm:flex-col max-sm:items-center md:flex-row md:justify-between">
            {foreCast.list.slice(0, 3).map((weather, index, arr) => (
              <div
                key={weather.dt_txt}
                className="flex-center w-full flex-col pr-25 max-sm:p-0 md:border-r md:border-r-gray-700"
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
                {index !== arr.length - 1 && (
                  <hr className="my-4 text-gray-500 max-sm:w-full md:my-0 md:text-gray-50" />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-20 w-full rounded-lg p-6 shadow-md md:w-[80%]">
          <h3 className="my-2 font-bold max-sm:text-center sm:text-left">
            Weekly outlook
          </h3>
          {weeklyData.map((weather, index, arr) => (
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
              {index !== arr.length - 1 && (
                <hr className="my-2 text-gray-500" />
              )}
            </div>
          ))}
        </div>
        <div className="mt-20 w-full shadow-md max-sm:p-4 sm:p-6 md:w-[80%]">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Weather details</h3>
            <button
              type="button"
              className="cursor-pointer rounded-full bg-blue-500 py-2 font-bold text-white transition-all duration-400 hover:bg-blue-400 max-sm:px-2 sm:px-4"
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
                    {Math.round(current.main.feels_like)}℃
                  </span>
                </p>
              </div>
              <div className="mt-5 flex gap-2">
                <FaWind className="text-3xl" />
                <p>
                  Breeze <br />
                  <span className="font-bold">{current.wind.speed} m/s</span>
                </p>
              </div>
            </div>
            <div className="flex-center mt-5 w-full flex-col">
              <div className="mb-5 flex gap-2">
                <IoWaterSharp className="text-3xl" />
                <p>
                  Precipitation <br />
                  <span className="font-bold">
                    {Math.round(foreCast.list[0].pop * 100)} %
                  </span>
                </p>
              </div>
              <div className="-ml-3 flex gap-2">
                <IoSettings className="text-3xl" />
                <p>
                  UV level
                  <br />
                  <span className="font-bold">
                    {Math.round(foreCast.list[0].visibility / 100)} k/m
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

export default Dashboard;
