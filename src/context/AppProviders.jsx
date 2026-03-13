import { ThemeProvider } from "./ThemeContext";
import { LanguageProvider } from "./LanguageContext";
import { LocationProvider } from "./LocationContext";
import { WeatherProvider } from "./WeatherContext";

function AppProviders({ children }) {
  return (
    <LocationProvider>
      <LanguageProvider>
        <WeatherProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </WeatherProvider>
      </LanguageProvider>
    </LocationProvider>
  );
}

export default AppProviders;
