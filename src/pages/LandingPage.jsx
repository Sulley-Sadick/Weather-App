import { useNavigate } from "react-router-dom";

import { GoArrowRight } from "react-icons/go";
import weatherLogo from "../assets/weatherapp.png";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <section>
      <img
        src={weatherLogo}
        className="mx-auto mt-10 w-[50%] md:mt-2"
        alt="weather logo"
      />
      <h1 className="mt-25 mb-2 ml-11 flex flex-col items-center text-5xl font-black">
        Current <br />
        <span className="text-2xl font-medium">Weather Dashboard</span>
      </h1>
      <div className="flex flex-col items-center justify-center p-2">
        <button
          aria-label="Go to weather search"
          type="button"
          className="my-10 ml-6 flex cursor-pointer flex-col items-center justify-center rounded-full bg-blue-600 p-1 text-2xl text-white transition-all duration-400 hover:bg-blue-500 sm:ml-12"
          onClick={() => navigate("/search")}
        >
          <GoArrowRight />
        </button>
      </div>
    </section>
  );
}

export default LandingPage;
