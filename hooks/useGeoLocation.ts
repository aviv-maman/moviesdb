import { useEffect, useRef, useState } from 'react';

interface GeolocationState {
  position: GeolocationPosition | null;
  loading: boolean;
  error: GeolocationPositionError | null;
}

type GeoLocationOptions = {
  maximumAge?: number;
  timeout?: number;
  enableHighAccuracy?: boolean;
};

export function useGeoLocation(options?: GeoLocationOptions) {
  const [state, setState] = useState<GeolocationState>({
    position: null,
    loading: true,
    error: null,
  });

  const optionsRef = useRef(options);

  useEffect(() => {
    const onSuccess = ({ coords, timestamp }: GeolocationPosition) => {
      setState((state) => ({
        loading: false,
        position: { coords, timestamp },
        error: null,
      }));
    };

    const onError = (error: GeolocationPositionError) => {
      setState((state) => ({ ...state, loading: false, error }));
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError, optionsRef.current);

    const watchId = navigator.geolocation.watchPosition(onSuccess, onError, optionsRef.current);

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return state;
}
