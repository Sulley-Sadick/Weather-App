import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { useEffect } from "react";

import { SearchPage } from "./pages/SearchPage";
import { LandingPage } from "./pages/LandingPage";
import { useWeatherContext } from "./context/WeatherContext";
import { WeatherDetails } from "./pages/WeatherDetails";
import { Dashboard } from "./pages/Dashboard";
import { useLocationContext } from "./context/LocationContext";
import { AppProviders } from "./context/AppProviders";

function AppRoutes() {
  const { coordinates, setGeolocationError } = useLocationContext();
  const { hasAutoFetched, setHasAutoFetched, fetchWeatherByCoordinates } =
    useWeatherContext();

  const navigate = useNavigate();
  const location = useLocation();

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
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/weatherDetails" element={<WeatherDetails />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </AnimatePresence>
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
