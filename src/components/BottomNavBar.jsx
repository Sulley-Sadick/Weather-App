import { FaCloudSun, FaListOl, FaMap } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

function BottomNavBar() {
  return (
    <nav className="flex-center fixed bottom-0 w-full justify-center gap-20 bg-[#f5f6f6] py-4">
      <button
        type="button"
        className="cursor-pointer"
        aria-label="weather details"
      >
        <FaCloudSun className="icon-size" />
      </button>
      <button type="button" className="cursor-pointer" aria-label="sorting">
        <FaListOl className="icon-size" />
      </button>
      <button type="button" className="cursor-pointer" aria-label="map">
        <FaMap className="icon-size" />
      </button>
      <button type="button" className="cursor-pointer" aria-label="settings">
        <IoMdSettings className="icon-size" />
      </button>
    </nav>
  );
}

export default BottomNavBar;
