import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { LandingPage } from '@/pages/LandingPage'
import { NearbyHotelsPage } from '@/pages/NearbyHotelsPage'
import { HotelDetailsPage } from '@/pages/HotelDetailsPage'
import { DirectionsPage } from '@/pages/DirectionsPage'
import { FavoritesPage } from '@/pages/FavoritesPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'nearby', element: <NearbyHotelsPage /> },
      { path: 'hotel/:id', element: <HotelDetailsPage /> },
      { path: 'directions/:id', element: <DirectionsPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
    ],
  },
])
