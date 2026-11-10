import { useCallback } from 'react'
import { useLocationStore } from '@/stores/locationStore'

export function useGeolocation() {
  const { location, status, error, setLocation, setStatus, setError, reset } =
    useLocationStore()

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      return
    }

    setStatus('loading')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        })
      },
      (err) => {
        let message = 'Unable to retrieve your location'
        if (err.code === err.PERMISSION_DENIED) {
          message = 'Location permission denied. Please enable it in your browser settings.'
          setStatus('denied')
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          message = 'Location information is unavailable.'
        } else if (err.code === err.TIMEOUT) {
          message = 'Location request timed out.'
        }
        setError(message)
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000,
      }
    )
  }, [setLocation, setStatus, setError])

  return {
    location,
    status,
    error,
    requestLocation,
    reset,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isDenied: status === 'denied',
  }
}
