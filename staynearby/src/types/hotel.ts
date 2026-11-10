export interface Coordinates {
  lat: number
  lng: number
}

export interface Hotel {
  id: string
  name: string
  address: string
  lat: number
  lng: number
  distance?: number // meters
  phone?: string
  website?: string
  rating?: number
  stars?: number
  amenities?: string[]
  photoUrl?: string
  openingHours?: string
}

export interface HotelFilters {
  radius: number // km
  minRating?: number
  maxDistance?: number
  searchQuery?: string
}

export type TravelMode = 'walking' | 'driving'
