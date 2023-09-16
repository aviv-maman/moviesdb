import { useEffect, useRef, useState } from 'react';

interface GeolocationState {
  loading: boolean;
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number | null;
  longitude: number | null;
  speed: number | null;
  timestamp: number | null;
  error: GeolocationPositionError | null;
}

type GeoLocationOptions = {
  maximumAge?: number;
  timeout?: number;
  enableHighAccuracy?: boolean;
};

export function useGeoLocation(options?: GeoLocationOptions) {
  const [state, setState] = useState<GeolocationState>({
    loading: true,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: null,
    error: null,
  });

  const optionsRef = useRef(options);

  useEffect(() => {
    const onSuccess = ({ coords, timestamp }: GeolocationPosition) => {
      setState({
        loading: false,
        timestamp,
        latitude: coords.latitude,
        longitude: coords.longitude,
        altitude: coords.altitude,
        accuracy: coords.accuracy,
        altitudeAccuracy: coords.altitudeAccuracy,
        heading: coords.heading,
        speed: coords.speed,
        error: null,
      });
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
