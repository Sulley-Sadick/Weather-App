import { createContext, useContext } from "react";
import { useGeolocation } from "../hooks/useGeolocation";

export const LocationContext = createContext(null);

export const LocationProvider = function ({ children }) {
  const {
    coordinates,
    setGeolocationError,
    geolocationLoading,
    retry,
    geolocationError,
  } = useGeolocation();

  return (
    <LocationContext.Provider
      value={{
        coordinates,
        setGeolocationError,
        geolocationError,
        retry,
        geolocationLoading,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);

  if (!context)
    throw new Error("useLocation must be used within a LocationProvider");

  return context;
};
