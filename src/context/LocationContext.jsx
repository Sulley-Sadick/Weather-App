// hooks
import { createContext } from "react";

// creatd components
import { useGeolocation } from "../customHooks/useGeolocation";

export const LocationContext = createContext(null);

export function LocationProvider({ children }) {
  const { coordinates, geolocationLoading, retry, geolocationError } =
    useGeolocation();

  return (
    <LocationContext.Provider
      value={{ coordinates, geolocationError, retry, geolocationLoading }}
    >
      {children}
    </LocationContext.Provider>
  );
}
