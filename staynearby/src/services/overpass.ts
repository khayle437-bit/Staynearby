import type { Hotel } from '@/types/hotel'
import { getDistanceMeters } from '@/utils/distance'

const OVERPASS_URL = 'https://overpass-api.de/api/interpreter'

/**
 * Fetch hotels near a location using OpenStreetMap Overpass API.
 * Completely free, no API key required.
 */
export async function fetchNearbyHotels(
  lat: number,
  lng: number,
  radiusKm: number = 3
): Promise<Hotel[]> {
  const radiusMeters = Math.round(radiusKm * 1000)

  // Query for hotels, hostels, guest houses, motels
  const query = `
    [out:json][timeout:25];
    (
      node["tourism"~"hotel|hostel|guest_house|motel|apartment"](around:${radiusMeters},${lat},${lng});
      way["tourism"~"hotel|hostel|guest_house|motel|apartment"](around:${radiusMeters},${lat},${lng});
      relation["tourism"~"hotel|hostel|guest_house|motel|apartment"](around:${radiusMeters},${lat},${lng});
    );
    out center tags;
  `

  const response = await fetch(OVERPASS_URL, {
    method: 'POST',
    body: query,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  if (!response.ok) {
    throw new Error(`Overpass API error: ${response.status}`)
  }

  const data = await response.json()

  const hotels: Hotel[] = (data.elements || [])
    .map((el: any): Hotel | null => {
      const tags = el.tags || {}
      const name = tags.name || tags['name:en'] || 'Unnamed Hotel'
      if (!name || name === 'Unnamed Hotel') return null

      // Prefer center for ways/relations
      const hLat = el.lat ?? el.center?.lat
      const hLng = el.lon ?? el.center?.lon
      if (!hLat || !hLng) return null

      const distance = getDistanceMeters(lat, lng, hLat, hLng)

      const amenities: string[] = []
      if (tags.wifi === 'yes' || tags['internet_access'] === 'wlan') amenities.push('WiFi')
      if (tags.parking) amenities.push('Parking')
      if (tags.swimming_pool === 'yes') amenities.push('Pool')
      if (tags.restaurant === 'yes') amenities.push('Restaurant')
      if (tags.air_conditioning === 'yes') amenities.push('AC')
      if (tags.breakfast === 'yes') amenities.push('Breakfast')

      return {
        id: String(el.id),
        name,
        address:
          tags['addr:full'] ||
          [tags['addr:housenumber'], tags['addr:street'], tags['addr:city']]
            .filter(Boolean)
            .join(' ') ||
          tags['addr:place'] ||
          'Address not available',
        lat: hLat,
        lng: hLng,
        distance,
        phone: tags.phone || tags['contact:phone'] || undefined,
        website: tags.website || tags['contact:website'] || undefined,
        stars: tags.stars ? Number(tags.stars) : undefined,
        amenities: amenities.length > 0 ? amenities : undefined,
        openingHours: tags.opening_hours || undefined,
      }
    })
    .filter(Boolean) as Hotel[]

  // Sort by distance
  return hotels.sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0))
}
