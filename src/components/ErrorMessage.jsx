// hooks
import { useNavigate } from "react-router-dom";

function ErrorMessage({ message, onRetry }) {
  const navigate = useNavigate();

  const handleRetry = async () => {
    const success = await onRetry();

    if (success) navigate("/weathercard");
  };

  return (
    <div className="flex-center h-40 w-full flex-col rounded-md p-4 shadow-md sm:w-100 dark:bg-gray-800">
      <h1 className="text-[1rem] font-semibold text-red-500 dark:text-red-400">
        {message}
      </h1>
      <button
        type="button"
        role="search"
        onClick={handleRetry}
        aria-label="search weather climate"
        className="mx-auto mt-7 block cursor-pointer rounded-md bg-gray-200 p-2 font-bold text-gray-800 transition-colors duration-400 hover:bg-gray-500 dark:bg-gray-700 dark:text-gray-100"
      >
        Try again
      </button>
    </div>
  );
}

export default ErrorMessage;
