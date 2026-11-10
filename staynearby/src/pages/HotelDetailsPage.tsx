import { useLocation, useParams, Link } from 'react-router-dom'
import {
  MapPin,
  Phone,
  Globe,
  Heart,
  Navigation,
  ArrowLeft,
  Star,
  Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { formatDistance } from '@/utils/distance'
import type { Hotel } from '@/types/hotel'
import { cn } from '@/utils/cn'

export function HotelDetailsPage() {
  const { id } = useParams()
  const locationState = useLocation().state as { hotel?: Hotel } | null
  const hotel = locationState?.hotel
  const { isFavorite, toggleFavorite } = useFavoritesStore()

  if (!hotel || hotel.id !== id) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-semibold">Hotel not found</h2>
        <p className="mt-2 text-slate-600">
          Please go back and select a hotel from the list.
        </p>
        <Link to="/nearby">
          <Button className="mt-6">Back to nearby hotels</Button>
        </Link>
      </div>
    )
  }

  const fav = isFavorite(hotel.id)

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        to="/nearby"
        className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-teal-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to results
      </Link>

      <Card className="overflow-hidden">
        {/* Header image placeholder */}
        <div className="h-48 sm:h-64 bg-gradient-to-br from-teal-400 to-cyan-600 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <MapPin className="w-16 h-16 text-white/40" />
          </div>
          <button
            onClick={() => toggleFavorite(hotel)}
            className={cn(
              'absolute top-4 right-4 p-3 rounded-full shadow-lg transition-colors',
              fav ? 'bg-red-500 text-white' : 'bg-white text-slate-500 hover:text-red-500'
            )}
          >
            <Heart className={cn('w-5 h-5', fav && 'fill-current')} />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{hotel.name}</h1>

          <div className="flex items-start gap-2 mt-3 text-slate-600">
            <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{hotel.address}</span>
          </div>

          {hotel.distance != null && (
            <p className="mt-2 text-teal-600 font-medium">
              {formatDistance(hotel.distance)} from your location
            </p>
          )}

          {hotel.stars && (
            <div className="flex items-center gap-1 mt-3">
              {Array.from({ length: Math.min(hotel.stars, 5) }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-1 text-sm text-slate-500">{hotel.stars}-star</span>
            </div>
          )}

          {/* Amenities */}
          {hotel.amenities && hotel.amenities.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-slate-900 mb-2">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {hotel.amenities.map((a) => (
                  <span
                    key={a}
                    className="px-3 py-1 text-sm bg-teal-50 text-teal-800 rounded-full"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}

          {hotel.openingHours && (
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
              <Clock className="w-4 h-4" />
              {hotel.openingHours}
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-3">
            {hotel.phone && (
              <a href={`tel:${hotel.phone}`}>
                <Button variant="outline">
                  <Phone className="w-4 h-4" />
                  {hotel.phone}
                </Button>
              </a>
            )}
            {hotel.website && (
              <a href={hotel.website} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  <Globe className="w-4 h-4" />
                  Website
                </Button>
              </a>
            )}
            <Link to={`/directions/${hotel.id}`} state={{ hotel }}>
              <Button>
                <Navigation className="w-4 h-4" />
                Get Directions
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}
