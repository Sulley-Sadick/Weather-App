import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { GoArrowLeft } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { FaCloud } from "react-icons/fa";
import BottomNavBar from "./BottomNavBar";
import { WeatherContext } from "../context/WeatherContext";

function SearchPage() {
  const navigate = useNavigate();

  // call weatherProvider to get the values they provide
  const { data, loading, error, searchCity } = useContext(WeatherContext);

  const [inputValue, setInputValue] = useState("");

  const cities = ["Kumasi", "Accra"];

  const handleSubmit = async function (e) {
    // prevent browser from automatically submitting the form
    e.preventDefault();

    // return when inputValue is undefined or null
    if (!inputValue.trim()) return;

    // update value using setInputValue
    setInputValue(inputValue);

    // pass inputValue to searchCity function when being called in WeatherContext.jsx
    const success = await searchCity(inputValue);

    // go to dashboard
    if (success) navigate("/dashboard");

    // clear input field
    setInputValue("");
  };

  return (
    <section className="mb-12 bg-white">
      <div className="p-6">
        <button
          className="cursor-pointer text-3xl font-normal"
          type="button"
          aria-label="Go back to landing page"
          onClick={() => navigate("/")}
        >
          <GoArrowLeft />
        </button>
        <form className="mt-4 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="search" className="text-4xl font-bold">
            Search
          </label>
          <div className="relative my-4 rounded-full p-2 shadow-[5px_5px_20px_rgba(0,0,0,0.2)] lg:max-w-[30%]">
            <input
              className="flex-center w-full rounded-md pt-0.5 pr-2 pl-10 font-medium text-gray-500 shadow-2xl outline-none focus:rounded-md"
              type="search"
              placeholder="Enter city name"
              name="search"
              id="search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <CiSearch className="absolute top-3 left-5 text-2xl text-gray-500" />
          </div>
        </form>
        <div className="flex-center mt-10 justify-between md:justify-normal md:gap-39">
          <h2 className="font-bold">Recent Searches</h2>
          <button
            type="button"
            aria-label="clear weather history"
            className="cursor-pointer font-semibold hover:underline"
          >
            Clear history
          </button>
        </div>
        <div className="mt-5 flex flex-col gap-5 md:flex-row">
          {cities.map((city) => (
            <div className="flex-center flex-col" key={city}>
              <div className="weather-container"></div>
              <div className="md:self-start">
                <h3 className="mt-2 font-medium">Current weather in {city}</h3>
                <p className="text-center md:text-left">Ghana</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h3 className="mt-10 mb-5 font-bold">Suggested Cities</h3>
          <div className="flex flex-col gap-4">
            {cities.map((city, index, arr) => (
              <div key={city}>
                <div className="flex gap-4">
                  <div className="h-20 w-20 rounded-md bg-blue-400"></div>
                  <div>
                    <h3>{city}</h3>
                    <p className="text-gray-400">Weather in {city}</p>
                    <div className="flex-center gap-2">
                      <FaCloud />
                      <span> 18</span>
                      <span className="text-gray-400">
                        Humidity: {city === "Kumasi" ? "70%" : "80%"}{" "}
                      </span>
                    </div>
                  </div>
                </div>
                {index !== arr.length - 1 && (
                  <hr className="my-4 w-full text-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* BottomNavBar component */}
      <BottomNavBar />
    </section>
  );
}

export default SearchPage;
