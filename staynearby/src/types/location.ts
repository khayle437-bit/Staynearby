export interface UserLocation {
  lat: number
  lng: number
  accuracy?: number
  timestamp?: number
}

export type LocationStatus = 'idle' | 'loading' | 'success' | 'error' | 'denied'
