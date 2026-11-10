import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Hotel } from '@/types/hotel'

interface FavoritesState {
  favorites: Hotel[]
  addFavorite: (hotel: Hotel) => void
  removeFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  toggleFavorite: (hotel: Hotel) => void
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (hotel) =>
        set((state) => ({
          favorites: state.favorites.some((h) => h.id === hotel.id)
            ? state.favorites
            : [...state.favorites, hotel],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((h) => h.id !== id),
        })),
      isFavorite: (id) => get().favorites.some((h) => h.id === id),
      toggleFavorite: (hotel) => {
        const { isFavorite, addFavorite, removeFavorite } = get()
        if (isFavorite(hotel.id)) {
          removeFavorite(hotel.id)
        } else {
          addFavorite(hotel)
        }
      },
    }),
    {
      name: 'staynearby-favorites',
    }
  )
)
