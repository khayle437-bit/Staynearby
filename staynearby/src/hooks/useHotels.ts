import { useQuery } from '@tanstack/react-query'
import { fetchNearbyHotels } from '@/services/overpass'
import { useLocationStore } from '@/stores/locationStore'

export function useHotels(radiusKm: number = 3) {
  const location = useLocationStore((s) => s.location)

  return useQuery({
    queryKey: ['hotels', location?.lat, location?.lng, radiusKm],
    queryFn: () => {
      if (!location) throw new Error('No location available')
      return fetchNearbyHotels(location.lat, location.lng, radiusKm)
    },
    enabled: !!location,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  })
}
