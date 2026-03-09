import { useEffect, useState } from "react";

export function useGeolocation() {
  const [geolocationError, setGeolocationError] = useState(null);
  const [geolocationLoading, setGeolocationLoading] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [retryKey, setRetryKey] = useState(0);

  const retry = () => {
    setGeolocationError(null);

    setGeolocationLoading(true);

    setRetryKey((prev) => prev + 1);
  };

  useEffect(() => {
    const handleSuccess = (position) => {
      const { coords } = position;

      setGeolocationLoading(false);

      const { latitude, longitude } = coords;

      setCoordinates({ latitude, longitude });

      setGeolocationError(null);
    };

    const timer = setTimeout(() => {
      setGeolocationLoading(false);
      setGeolocationError("Location unavailable.");
    }, 300000);

    const handleError = (err) => {
      setGeolocationError(err.message);
      setGeolocationLoading(false);
    };

    setGeolocationLoading(true);

    if (!navigator.geolocation) {
      setGeolocationError("Geolocation is not supported by this browser.");
      setGeolocationLoading(false);

      return;
    }

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    return () => clearTimeout(timer);
  }, [retryKey]);

  return {
    geolocationError,
    setGeolocationError,
    geolocationLoading,
    retry,
    coordinates,
  };
}
