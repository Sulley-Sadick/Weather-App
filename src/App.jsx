import { BrowserRouter, Routes, Route } from "react-router-dom";

import SearchPage from "./components/SearchPage";
import LandingPage from "./pages/LandingPage";
import WeatherProvider from "./context/WeatherContext";
import Dashboard from "./pages/Dashboard";
import WeatherDetails from "./pages/WeatherDetails";

function App() {
  return (
    <WeatherProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<SearchPage />} />{" "}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/details" element={<WeatherDetails />} />
        </Routes>
      </BrowserRouter>
    </WeatherProvider>
  );
}

export default App;
