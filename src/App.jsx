import { BrowserRouter, Routes, Route } from "react-router-dom";

import { SearchPage } from "./pages/SearchPage";
import { LandingPage } from "./pages/LandingPage";
import { WeatherProvider } from "./context/WeatherContext";
import { WeatherDetails } from "./pages/WeatherDetails";
import { WeatherCard } from "./pages/WeatherCard";
import { LocationProvider } from "./context/LocationContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <BrowserRouter>
      <LocationProvider>
        <LanguageProvider>
          <WeatherProvider>
            <ThemeProvider>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/weathercard" element={<WeatherCard />} />
                <Route path="/details" element={<WeatherDetails />} />
                <Route path="*" element={<LandingPage />} />
              </Routes>
            </ThemeProvider>
          </WeatherProvider>
        </LanguageProvider>
      </LocationProvider>
    </BrowserRouter>
  );
}

export default App;
