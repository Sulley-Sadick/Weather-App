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
      <div className="flex flex-col sm:ml-30">
        <div className="flex-center flex-col">
          <h1 className="mt-25 mb-4 flex flex-col items-center text-5xl font-black sm:mt-10">
            Current
          </h1>
          <span className="text-2xl font-medium">Weather Dashboard</span>
        </div>
        <div className="mr-11 flex flex-col items-center max-sm:mr-0">
          <button
            aria-label="Go to weather search"
            type="button"
            className="my-10 flex cursor-pointer flex-col items-center rounded-full bg-blue-600 p-1 text-2xl text-white transition-all duration-400 hover:bg-blue-500"
            onClick={() => navigate("/search")}
          >
            <GoArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
