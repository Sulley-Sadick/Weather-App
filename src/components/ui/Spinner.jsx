import { PiSpinner } from "react-icons/pi";

export function Spinner() {
  return (
    <div className="flex-center flex-col">
      <PiSpinner size={50} className="animate-spin text-[#f38e82]" />
      <p>Fetching data...</p>
    </div>
  );
}
