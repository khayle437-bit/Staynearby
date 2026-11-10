import type { TravelMode } from '@/types/hotel'

export interface RouteResult {
  distance: number // meters
  duration: number // seconds
  geometry: [number, number][] // [lat, lng][]
  steps?: string[]
}

/**
 * Get walking or driving route using OSRM (free, no key).
 */
export async function getRoute(
  fromLat: number,
  fromLng: number,
  toLat: number,
  toLng: number,
  mode: TravelMode = 'driving'
): Promise<RouteResult> {
  const profile = mode === 'walking' ? 'foot' : 'car'
  const url = `https://router.project-osrm.org/route/v1/${profile}/${fromLng},${fromLat};${toLng},${toLat}?overview=full&geometries=geojson&steps=true`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`OSRM error: ${response.status}`)
  }

  const data = await response.json()
  if (data.code !== 'Ok' || !data.routes?.[0]) {
    throw new Error('No route found')
  }

  const route = data.routes[0]
  const coords = route.geometry.coordinates.map(
    ([lng, lat]: [number, number]) => [lat, lng] as [number, number]
  )

  return {
    distance: route.distance,
    duration: route.duration,
    geometry: coords,
  }
}

export function formatDuration(seconds: number): string {
  const mins = Math.round(seconds / 60)
  if (mins < 60) return `${mins} min`
  const hours = Math.floor(mins / 60)
  const remain = mins % 60
  return remain > 0 ? `${hours} h ${remain} min` : `${hours} h`
}
