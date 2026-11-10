import { create } from 'zustand'
import type { UserLocation, LocationStatus } from '@/types/location'

interface LocationState {
  location: UserLocation | null
  status: LocationStatus
  error: string | null
  setLocation: (loc: UserLocation) => void
  setStatus: (status: LocationStatus) => void
  setError: (error: string | null) => void
  reset: () => void
}

export const useLocationStore = create<LocationState>((set) => ({
  location: null,
  status: 'idle',
  error: null,
  setLocation: (location) => set({ location, status: 'success', error: null }),
  setStatus: (status) => set({ status }),
  setError: (error) => set({ error, status: 'error' }),
  reset: () => set({ location: null, status: 'idle', error: null }),
}))
