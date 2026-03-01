import { BrowserRouter, Routes, Route } from "react-router-dom";

import SearchPage from "./components/SearchPage";
import LandingPage from "./pages/LandingPage";
import WeatherProvider from "./context/WeatherContext";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <WeatherProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<SearchPage />} />{" "}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </WeatherProvider>
  );
}

export default App;
