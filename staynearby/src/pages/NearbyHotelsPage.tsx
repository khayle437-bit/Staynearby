import { useState } from 'react'
import { MapPin, List, Map as MapIcon, RefreshCw, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { HotelCard } from '@/components/HotelCard'
import { HotelMap } from '@/features/map/HotelMap'
import { useGeolocation } from '@/hooks/useGeolocation'
import { useHotels } from '@/hooks/useHotels'
import { cn } from '@/utils/cn'

export function NearbyHotelsPage() {
  const { location, status, error, requestLocation, isLoading: locLoading } =
    useGeolocation()
  const [radius, setRadius] = useState(3)
  const [view, setView] = useState<'list' | 'map'>('list')

  const { data: hotels = [], isLoading, isError, error: hotelsError, refetch } =
    useHotels(radius)

  // Auto-request location if not available
  if (status === 'idle') {
    requestLocation()
  }

  if (status === 'loading' || (status === 'success' && isLoading)) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center gap-3 text-teal-700">
          <RefreshCw className="w-6 h-6 animate-spin" />
          <span className="text-lg font-medium">
            {status === 'loading' ? 'Getting your location…' : 'Finding nearby hotels…'}
          </span>
        </div>
      </div>
    )
  }

  if (status === 'error' || status === 'denied' || !location) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-xl font-semibold text-slate-900">Location required</h2>
        <p className="mt-2 text-slate-600">
          {error || 'We need your location to show nearby hotels.'}
        </p>
        <Button className="mt-6" onClick={requestLocation} isLoading={locLoading}>
          <MapPin className="w-4 h-4" />
          Enable Location
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Hotels near you</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {hotels.length} places within {radius} km
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Radius selector */}
          <select
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value={1}>1 km</option>
            <option value={2}>2 km</option>
            <option value={3}>3 km</option>
            <option value={5}>5 km</option>
            <option value={10}>10 km</option>
          </select>

          {/* View toggle */}
          <div className="flex rounded-xl border border-slate-200 overflow-hidden">
            <button
              onClick={() => setView('list')}
              className={cn(
                'px-3 py-2 text-sm font-medium flex items-center gap-1.5 transition-colors',
                view === 'list'
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              )}
            >
              <List className="w-4 h-4" />
              List
            </button>
            <button
              onClick={() => setView('map')}
              className={cn(
                'px-3 py-2 text-sm font-medium flex items-center gap-1.5 transition-colors',
                view === 'map'
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              )}
            >
              <MapIcon className="w-4 h-4" />
              Map
            </button>
          </div>

          <Button variant="ghost" size="sm" onClick={() => refetch()}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {isError && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-700 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {hotelsError?.message || 'Failed to load hotels. Try again.'}
        </div>
      )}

      {view === 'map' ? (
        <HotelMap
          userLocation={location}
          hotels={hotels}
          className="h-[calc(100vh-220px)] min-h-[400px] w-full rounded-2xl border border-slate-200"
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {hotels.length === 0 ? (
            <div className="col-span-full text-center py-16 text-slate-500">
              No hotels found within {radius} km. Try increasing the radius.
            </div>
          ) : (
            hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)
          )}
        </div>
      )}
    </div>
  )
}
