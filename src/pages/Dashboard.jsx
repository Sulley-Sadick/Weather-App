import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

import { PiThermometerBold, PiThermometerSimpleBold } from "react-icons/pi";
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
      <div className="mb-20">
        <div>
          <img
            src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
            alt={current.weather[0].main}
          />
          <h1>{current.name}</h1>
          <p>Chance of rain {foreCast.list[0].pop * 100}%</p>
          {/* image */}
          <h3>{Math.round(current.main.temp)}℃</h3>
        </div>
        <div>
          <h3>Today's Weather</h3>
          {foreCast.list.slice(0, 3).map((weather) => (
            <div key={weather.dt_txt}>
              <h2>{weather.dt_txt.split(" ")[1].slice(0, -3)} Hours</h2>
              {/* image */}
              <h3>{Math.round(weather.main.temp)}℃</h3>
            </div>
          ))}
        </div>
        <div>
          <h3>Weekly outlook</h3>
          {weeklyData.map((weather, index) => (
            <div key={weather.dt_txt}>
              <p>
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
              <span>{weather.weather[0].main}</span>
              <p>
                {Math.round(weather.main.temp_max)} /
                {Math.round(weather.main.temp_min)}
              </p>
            </div>
          ))}
        </div>
        <div>
          <div>
            <h3>
              weather details
              <button type="button">More info</button>
            </h3>
          </div>
          <div>
            <div>
              <PiThermometerSimpleBold />
              <p>
                Feels like <br />
                {Math.round(current.main.feels_like)}℃
              </p>
            </div>
            <div>
              <FaWind />
              <p>
                Breeze <br />
                {current.wind.speed} m/s
              </p>
            </div>
            <div>
              <IoWaterSharp />
              <p>
                Precipitation <br />
                {Math.round(foreCast.list[0].pop * 100)} %
              </p>
            </div>
            <div>
              <IoSettings />
              <p>UV level</p>
            </div>
          </div>
        </div>
      </div>
      <BottomNavBar />
    </section>
  );
}

export default Dashboard;
