import { PiSpinner } from "react-icons/pi";

function Spinner() {
  return (
    <div className="flex-center flex-col">
      <PiSpinner size={50} className="animate-spin text-[#f38e82]" />
      <p>Fetching data...</p>
    </div>
  );
}

export default Spinner;
