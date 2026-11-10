import { useState, useEffect } from 'react'
import { useLocation, useParams, Link } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import {
  ArrowLeft,
  Footprints,
  Car,
  Clock,
  Route,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useLocationStore } from '@/stores/locationStore'
import { getRoute, formatDuration } from '@/services/osrm'
import { formatDistance } from '@/utils/distance'
import type { Hotel, TravelMode } from '@/types/hotel'
import type { RouteResult } from '@/services/osrm'

function FitRoute({ geometry }: { geometry: [number, number][] }) {
  const map = useMap()
  useEffect(() => {
    if (geometry.length > 1) {
      const bounds = L.latLngBounds(geometry)
      map.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [map, geometry])
  return null
}

export function DirectionsPage() {
  const { id } = useParams()
  const locationState = useLocation().state as { hotel?: Hotel } | null
  const hotel = locationState?.hotel
  const userLocation = useLocationStore((s) => s.location)

  const [mode, setMode] = useState<TravelMode>('walking')
  const [route, setRoute] = useState<RouteResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!hotel || !userLocation) return

    setLoading(true)
    setError(null)

    getRoute(
      userLocation.lat,
      userLocation.lng,
      hotel.lat,
      hotel.lng,
      mode
    )
      .then(setRoute)
      .catch((err) => setError(err.message || 'Could not get directions'))
      .finally(() => setLoading(false))
  }, [hotel, userLocation, mode])

  if (!hotel || hotel.id !== id) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-semibold">Hotel not found</h2>
        <Link to="/nearby">
          <Button className="mt-6">Back to nearby hotels</Button>
        </Link>
      </div>
    )
  }

  if (!userLocation) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-semibold">Location required</h2>
        <p className="mt-2 text-slate-600">Enable location to get directions.</p>
        <Link to="/nearby">
          <Button className="mt-6">Go to Nearby</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <Link
        to={`/hotel/${hotel.id}`}
        state={{ hotel }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-teal-700 mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to hotel
      </Link>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Side panel */}
        <div className="lg:w-80 shrink-0 space-y-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Directions</h1>
            <p className="text-slate-600 text-sm mt-0.5">to {hotel.name}</p>
          </div>

          {/* Mode toggle */}
          <div className="flex rounded-xl border border-slate-200 overflow-hidden">
            <button
              onClick={() => setMode('walking')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                mode === 'walking'
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Footprints className="w-4 h-4" />
              Walk
            </button>
            <button
              onClick={() => setMode('driving')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                mode === 'driving'
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Car className="w-4 h-4" />
              Drive
            </button>
          </div>

          {loading && (
            <div className="p-4 rounded-xl bg-slate-50 text-slate-600 text-sm animate-pulse">
              Calculating route…
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-red-50 text-red-700 text-sm flex gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          {route && !loading && (
            <div className="p-4 rounded-xl bg-teal-50 border border-teal-100 space-y-3">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-teal-700" />
                <div>
                  <p className="font-semibold text-teal-900">
                    {formatDuration(route.duration)}
                  </p>
                  <p className="text-xs text-teal-700">Estimated time</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Route className="w-5 h-5 text-teal-700" />
                <div>
                  <p className="font-semibold text-teal-900">
                    {formatDistance(route.distance)}
                  </p>
                  <p className="text-xs text-teal-700">Total distance</p>
                </div>
              </div>
            </div>
          )}

          <div className="text-xs text-slate-400">
            Routes powered by OSRM · OpenStreetMap
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 h-[450px] lg:h-[560px] rounded-2xl overflow-hidden border border-slate-200">
          <MapContainer
            center={[userLocation.lat, userLocation.lng]}
            zoom={14}
            className="h-full w-full"
            scrollWheelZoom
          >
            <TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[userLocation.lat, userLocation.lng]} />
            <Marker position={[hotel.lat, hotel.lng]} />
            {route && (
              <>
                <Polyline
                  positions={route.geometry}
                  pathOptions={{ color: '#0d9488', weight: 5, opacity: 0.85 }}
                />
                <FitRoute geometry={route.geometry} />
              </>
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  )
}
