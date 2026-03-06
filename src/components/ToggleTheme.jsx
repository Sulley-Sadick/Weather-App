// hooks
import { useContext } from "react";

// created components
import { WeatherContext } from "../context/WeatherContext";

function ToggleTheme() {
  const { theme, changeTheme } = useContext(WeatherContext);

  return (
    <div className="flex-center self-end">
      <p className="font-bold text-gray-800 dark:text-gray-100">
        View {!theme ? "dark" : "white"} theme
      </p>
      <button
        type="button"
        role="switch"
        aria-label="ToggleTheme"
        className={`m-4 h-6 w-11 cursor-pointer rounded-full bg-gray-400 p-1 outline-none`}
        onClick={changeTheme}
      >
        <span
          className={`block h-4 ${theme ? "translate-x-5" : "translate-0"} w-4 rounded-full bg-gray-900 transition-transform duration-400 dark:bg-white`}
        ></span>
      </button>
    </div>
  );
}

export default ToggleTheme;
