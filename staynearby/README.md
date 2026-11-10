# StayNearby — Find Hotels Around You

A modern location-based hotel discovery web app built with **React + TypeScript**.

Perfect for travelers who arrive in an unfamiliar city and need a place to stay quickly.

## Features

- **Find hotels near me** — uses browser Geolocation API
- **Interactive map** — Leaflet + OpenStreetMap (completely free)
- **Hotel list** with distance, phone, amenities, ratings
- **Directions** — walking & driving routes via OSRM
- **Favorites** — saved locally with Zustand + LocalStorage
- **Fully responsive** — mobile-first design
- **Zero paid APIs** — Overpass (hotels) + OSRM (routing) + OSM tiles

## Tech Stack

| Layer          | Choice                          |
|----------------|---------------------------------|
| Framework      | React 19 + TypeScript           |
| Build          | Vite 8                          |
| Styling        | Tailwind CSS v4                 |
| Routing        | React Router v7                 |
| State          | Zustand                         |
| Data fetching  | TanStack Query                  |
| Maps           | Leaflet + react-leaflet         |
| Hotels data    | OpenStreetMap Overpass API      |
| Routing        | OSRM (Open Source Routing Machine) |
| Icons          | Lucide React                    |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open http://localhost:5173

## Project Structure

```
src/
├── app/           # Router & providers
├── components/    # Shared UI + layout
├── features/      # Feature modules (map, etc.)
├── hooks/         # useGeolocation, useHotels
├── pages/         # Route pages
├── services/      # Overpass + OSRM clients
├── stores/        # Zustand stores
├── types/         # TypeScript interfaces
└── utils/         # Helpers
```

## Notes

- Location permission is required for the core experience.
- Overpass API has rate limits — for heavy use consider self-hosting or Mapbox/Geoapify free tiers.
- No backend required. Everything runs in the browser.

---

Built as a final frontend project · React + TypeScript
