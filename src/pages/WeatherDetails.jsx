import { useContext } from "react";

import { WeatherContext } from "../context/WeatherContext";
import { GrPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

import BottomNavBar from "../components/BottomNavBar";

function WeatherDetails() {
  const navigate = useNavigate();

  const { selectedWeather } = useContext(WeatherContext);

  if (!selectedWeather) return <p>Data not available</p>;

  return (
    <section>
      <div className="flex-center mb-10 w-full flex-col justify-center p-6">
        <button
          type="button"
          aria-label="Go back"
          className="ml-2 flex cursor-pointer self-start text-2xl"
          onClick={() => navigate("/dashboard")}
        >
          <GrPrevious />
        </button>
        <h2 className="-mt-6 flex text-[1rem] font-black sm:text-2xl">
          Current Weather
        </h2>
        <div className="flex-center mt-8 flex-col">
          <h1 className="mb-4 text-4xl font-black">
            {selectedWeather.current.name}
          </h1>
          <p>
            Chance of rain:{" "}
            {Math.round(selectedWeather.foreCast.list[0].pop * 100)}%
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${selectedWeather.current.weather[0].icon}@2x.png`}
            alt={selectedWeather.current.weather[0].main}
          />
          <h3 className="text-4xl font-black">
            {Math.round(selectedWeather.current.main.temp)}℃
          </h3>
        </div>
        <div className="mt-15 grid grid-cols-2 gap-4">
          <div className="box-container">
            <p className="mb-2">UV index</p>
            <span className="text-2xl font-bold">N/A</span>
          </div>
          <div className="box-container">
            <p className="mb-2">Wind Speed</p>
            <span className="text-2xl font-bold">
              {Math.round(selectedWeather.current.wind.speed)}m/s
            </span>
          </div>
          <div className="box-container">
            <p className="mb-2">Humidity</p>
            <span className="text-2xl font-bold">
              {selectedWeather.current.main.humidity}%
            </span>
          </div>
          <div className="box-container">
            <p className="mb-2">Visibility</p>
            <span className="text-2xl font-bold">
              {selectedWeather.current.visibility / 1000}k/m
            </span>
          </div>
          <div className="box-container">
            <p className="mb-2">Feels like</p>
            <span className="text-2xl font-bold">
              {Math.round(selectedWeather.current.main.feels_like)}℃
            </span>
          </div>
          <div className="box-container">
            <p className="mb-2">Chance of rain</p>
            <span className="text-2xl font-bold">
              {selectedWeather.foreCast.list[0].pop * 100}%
            </span>
          </div>
          <div className="box-container">
            <p className="mb-2">Pressure</p>
            <span className="text-2xl font-bold">
              {selectedWeather.current.main.pressure} hPa
            </span>
          </div>
          <div className="box-container">
            <p className="mb-2">Sunset</p>
            <span className="text-2xl font-bold">
              {new Date(
                selectedWeather.current.sys.sunset * 1000,
              ).toLocaleTimeString("en-Us", {
                hour: "numeric",
                minute: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
      <BottomNavBar />
    </section>
  );
}

export default WeatherDetails;
