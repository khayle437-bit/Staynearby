import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { Link } from 'react-router-dom'
import type { Hotel } from '@/types/hotel'
import type { UserLocation } from '@/types/location'
import { formatDistance } from '@/utils/distance'

// Fix default marker icons in Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
})

const userIcon = new L.Icon({
  iconUrl:
    'data:image/svg+xml;base64,' +
    btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
      <circle cx="12" cy="12" r="10" fill="#0d9488" stroke="white" stroke-width="2"/>
      <circle cx="12" cy="12" r="4" fill="white"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 16],
})

const hotelIcon = new L.Icon({
  iconUrl:
    'data:image/svg+xml;base64,' +
    btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
      <path fill="#0f766e" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `),
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
})

function FitBounds({
  user,
  hotels,
}: {
  user: UserLocation
  hotels: Hotel[]
}) {
  const map = useMap()

  useEffect(() => {
    if (hotels.length === 0) {
      map.setView([user.lat, user.lng], 14)
      return
    }
    const bounds = L.latLngBounds([
      [user.lat, user.lng],
      ...hotels.map((h) => [h.lat, h.lng] as [number, number]),
    ])
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 })
  }, [map, user, hotels])

  return null
}

interface HotelMapProps {
  userLocation: UserLocation
  hotels: Hotel[]
  selectedHotelId?: string
  className?: string
}

export function HotelMap({
  userLocation,
  hotels,
  selectedHotelId,
  className = 'h-[400px] w-full rounded-2xl',
}: HotelMapProps) {
  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lng]}
      zoom={14}
      className={className}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FitBounds user={userLocation} hotels={hotels} />

      <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
        <Popup>You are here</Popup>
      </Marker>

      {hotels.map((hotel) => (
        <Marker
          key={hotel.id}
          position={[hotel.lat, hotel.lng]}
          icon={hotelIcon}
          opacity={selectedHotelId && selectedHotelId !== hotel.id ? 0.6 : 1}
        >
          <Popup>
            <div className="min-w-[160px]">
              <p className="font-semibold text-sm">{hotel.name}</p>
              {hotel.distance != null && (
                <p className="text-xs text-teal-600 mt-0.5">
                  {formatDistance(hotel.distance)}
                </p>
              )}
              <Link
                to={`/hotel/${hotel.id}`}
                state={{ hotel }}
                className="text-xs text-teal-700 font-medium mt-1 inline-block"
              >
                View details →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
