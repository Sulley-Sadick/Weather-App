// hooks
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// in-built components
import { GoArrowLeft } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { FaCloud } from "react-icons/fa";

// created components
import BottomNavBar from "./BottomNavBar";
import { WeatherContext } from "../context/WeatherContext";
import ToggleTheme from "./ToggleTheme";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";

function SearchPage() {
  const navigate = useNavigate();

  // call weatherProvider to get the values and functions they provide
  const { weatherHistory, loading, error, city, resetWeatherData, searchCity } =
    useContext(WeatherContext);

  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async function (e) {
    // prevent browser from automatically submitting the form
    e.preventDefault();

    // return when inputValue is undefined or null
    if (!inputValue.trim()) return;

    // update value using setInputValue
    setInputValue(inputValue);

    // pass inputValue to searchCity function when being called in WeatherContext.jsx
    const success = await searchCity(inputValue);

    // go to weathercard
    if (success) navigate("/weathercard");

    // clear input field
    setInputValue("");
  };

  return (
    <section className="mb-12 bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <div className="p-6">
        <div className="flex-center justify-between">
          <button
            className="cursor-pointer text-3xl font-normal"
            type="button"
            aria-label="Go back to landing page"
            onClick={() => navigate("/")}
          >
            <GoArrowLeft />
          </button>
          <ToggleTheme />
        </div>
        <div>
          <form className="mt-4 mb-6 flex flex-col" onSubmit={handleSubmit}>
            <label htmlFor="search" className="text-4xl font-bold">
              Search
            </label>
            <div className="flex-center gap-20">
              <div className="relative my-4 rounded-full p-2 shadow-[5px_5px_20px_rgba(0,0,0,0.2)] lg:max-w-[30%]">
                <input
                  className="flex-center w-full rounded-md pt-0.5 pr-2 pl-10 font-medium text-gray-800 shadow-2xl outline-none focus:rounded-md dark:bg-gray-800 dark:text-gray-100"
                  type="search"
                  placeholder="Enter city name"
                  name="search"
                  id="search"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <CiSearch className="absolute top-3 left-5 text-2xl text-gray-500" />
              </div>
              {loading && <Spinner />}
            </div>
          </form>
          {error && (
            <ErrorMessage message={error} onRetry={() => searchCity(city)} />
          )}
        </div>
        {!weatherHistory.length ? (
          ""
        ) : (
          <div className="flex-center mt-10 max-sm:justify-between sm:justify-normal md:gap-61">
            <h2 className="font-bold text-gray-900 dark:text-gray-100">
              Recent Searches
            </h2>

            <button
              type="button"
              aria-label="clear weather history"
              className="cursor-pointer font-semibold hover:underline"
              onClick={resetWeatherData}
            >
              Clear history
            </button>
          </div>
        )}

        <div className="mt-5 flex flex-col max-sm:gap-5 sm:gap-20 md:flex-row">
          {weatherHistory.slice(0, 2).map((city) => (
            <div className="flex-center flex-col" key={city.current.id}>
              <button
                className="cursor-pointer"
                role="search"
                aria-label="search weather data"
                onClick={async () => {
                  const success = await searchCity(city.current.name);
                  if (success) navigate("/weathercard");
                }}
              >
                <div>
                  <img
                    src={`https://openweathermap.org/img/wn/${city.current.weather[0].icon}@2x.png`}
                    alt=""
                  />
                </div>
                <div className="md:self-start">
                  <h3 className="mt-2 font-medium text-gray-900 dark:text-gray-100">
                    Current weather in {city.current.name}
                  </h3>
                </div>
              </button>
            </div>
          ))}
        </div>
        <div>
          {!weatherHistory.length ? (
            ""
          ) : (
            <h3 className="mt-10 mb-5 font-bold text-gray-900 dark:text-gray-100">
              Suggested Cities
            </h3>
          )}
          <div className="mt-10 grid grid-cols-1 gap-4 divide-y sm:grid-cols-2">
            {weatherHistory.slice(0, 5).map((city) => (
              <div key={city.current.id}>
                <div className="flex gap-4">
                  <button
                    role="button"
                    tabIndex={0}
                    className="cursor-pointer"
                    onClick={async () => {
                      const success = await searchCity(city.current.name);
                      if (success) navigate("/weathercard");
                    }}
                  >
                    <div>
                      <img
                        src={`https://openweathermap.org/img/wn/${city.current.weather[0].icon}@2x.png`}
                        alt=""
                      />
                    </div>
                  </button>
                  <div>
                    <h3 className="text-gray-900 dark:text-gray-100">
                      {city.current.name}
                    </h3>
                    <p className="text-gray-800 dark:text-gray-100">
                      Weather in {city.current.name}
                    </p>
                    <div className="flex-center gap-2">
                      <FaCloud />
                      <span> {Math.round(city.current.main.temp)}</span>
                      <span className="text-gray-400">
                        Humidity: {Math.round(city.current.main.humidity)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNavBar />
    </section>
  );
}

export default SearchPage;
