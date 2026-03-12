import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { SearchPage } from "./pages/SearchPage";
import { LandingPage } from "./pages/LandingPage";
import { useWeatherContext } from "./context/WeatherContext";
import { WeatherDetails } from "./pages/WeatherDetails";
import { Dashboard } from "./pages/Dashboard";
import { useLocationContext } from "./context/LocationContext";

import AppProviders from "./context/AppProviders";

function AppRoutes() {
  const { coordinates, setGeolocationError } = useLocationContext();
  const { hasAutoFetched, setHasAutoFetched, fetchWeatherByCoordinates } =
    useWeatherContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!coordinates || hasAutoFetched) return;

    const load = async () => {
      try {
        setHasAutoFetched(true);
        const success = fetchWeatherByCoordinates(coordinates);

        if (success) navigate("/dashboard", { replace: true });
      } catch (error) {
        setGeolocationError(error.message);
      }
    };

    load();
  }, [coordinates, hasAutoFetched]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/weatherDetails" element={<WeatherDetails />} />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </BrowserRouter>
  );
}

export default App;
