import { BrowserRouter, Routes, Route } from "react-router-dom";

import { SearchPage } from "./components/SearchPage";
import { LandingPage } from "./pages/LandingPage";
import { WeatherProvider } from "./context/WeatherContext";
import { WeatherDetails } from "./pages/WeatherDetails";
import { WeatherCard } from "./pages/WeatherCard";
import { LocationProvider } from "./context/locationContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <BrowserRouter>
      <LocationProvider>
        <WeatherProvider>
          <ThemeProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/search" element={<SearchPage />} />{" "}
              <Route path="/weathercard" element={<WeatherCard />} />
              <Route path="/details" element={<WeatherDetails />} />
            </Routes>
          </ThemeProvider>
        </WeatherProvider>
      </LocationProvider>
    </BrowserRouter>
  );
}

export default App;
