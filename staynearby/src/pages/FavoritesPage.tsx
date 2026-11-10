import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { HotelCard } from '@/components/HotelCard'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { Button } from '@/components/ui/Button'

export function FavoritesPage() {
  const favorites = useFavoritesStore((s) => s.favorites)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Saved hotels</h1>
      <p className="text-slate-500 text-sm mb-8">
        {favorites.length} hotel{favorites.length !== 1 ? 's' : ''} saved
      </p>

      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">No saved hotels yet</h2>
          <p className="mt-2 text-slate-600 max-w-sm mx-auto">
            Tap the heart icon on any hotel to save it here for quick access.
          </p>
          <Link to="/nearby">
            <Button className="mt-6">Find hotels near me</Button>
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {favorites.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} showDistance={false} />
          ))}
        </div>
      )}
    </div>
  )
}
