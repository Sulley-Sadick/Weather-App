// hooks
import { useNavigate } from "react-router-dom";
// in-built components
import { GoArrowRight } from "react-icons/go";

// created component
import ToggleTheme from "../components/ToggleTheme";
import { LuCloudSun } from "react-icons/lu";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen w-full bg-white dark:bg-gray-900 dark:text-gray-800">
      <div className="flex-center flex-col py-5">
        <ToggleTheme />
        <div className="mx-auto my-5">
          <LuCloudSun size={130} className="text-sky-500 dark:text-sky-400" />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex-center flex-col">
          <h1 className="mt-25 mb-4 flex flex-col items-center text-5xl font-black text-gray-800 sm:mt-10 dark:text-gray-100">
            Current
          </h1>
          <span className="text-2xl font-medium text-gray-800 dark:text-gray-100">
            Weather Dashboard
          </span>
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
