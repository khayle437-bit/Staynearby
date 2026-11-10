import { Link } from 'react-router-dom'
import { Heart, MapPin, Phone, Star, Navigation } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatDistance } from '@/utils/distance'
import { useFavoritesStore } from '@/stores/favoritesStore'
import type { Hotel } from '@/types/hotel'
import { cn } from '@/utils/cn'

interface HotelCardProps {
  hotel: Hotel
  showDistance?: boolean
}

export function HotelCard({ hotel, showDistance = true }: HotelCardProps) {
  const { isFavorite, toggleFavorite } = useFavoritesStore()
  const fav = isFavorite(hotel.id)

  return (
    <Card className="overflow-hidden group">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <Link
              to={`/hotel/${hotel.id}`}
              state={{ hotel }}
              className="font-semibold text-slate-900 text-lg hover:text-teal-700 transition-colors line-clamp-1"
            >
              {hotel.name}
            </Link>

            <div className="flex items-center gap-1.5 mt-1.5 text-slate-500 text-sm">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="line-clamp-1">{hotel.address}</span>
            </div>

            {showDistance && hotel.distance != null && (
              <p className="mt-1 text-sm font-medium text-teal-600">
                {formatDistance(hotel.distance)} away
              </p>
            )}

            {hotel.stars && (
              <div className="flex items-center gap-1 mt-2">
                {Array.from({ length: Math.min(hotel.stars, 5) }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
            )}

            {hotel.amenities && hotel.amenities.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {hotel.amenities.slice(0, 4).map((a) => (
                  <span
                    key={a}
                    className="px-2 py-0.5 text-xs bg-slate-100 text-slate-600 rounded-full"
                  >
                    {a}
                  </span>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => toggleFavorite(hotel)}
            className={cn(
              'p-2 rounded-full transition-colors shrink-0',
              fav
                ? 'bg-red-50 text-red-500'
                : 'bg-slate-50 text-slate-400 hover:text-red-400'
            )}
            aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={cn('w-5 h-5', fav && 'fill-current')} />
          </button>
        </div>

        <div className="flex items-center gap-2 mt-4">
          {hotel.phone && (
            <a href={`tel:${hotel.phone}`}>
              <Button variant="outline" size="sm">
                <Phone className="w-3.5 h-3.5" />
                Call
              </Button>
            </a>
          )}
          <Link to={`/directions/${hotel.id}`} state={{ hotel }}>
            <Button size="sm">
              <Navigation className="w-3.5 h-3.5" />
              Directions
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}
