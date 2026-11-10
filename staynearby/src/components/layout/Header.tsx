import { Link, NavLink } from 'react-router-dom'
import { MapPin, Heart, Home } from 'lucide-react'
import { cn } from '@/utils/cn'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-slate-900">
          <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <span>
            Stay<span className="text-teal-600">Nearby</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-slate-600 hover:bg-slate-50'
              )
            }
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </NavLink>

          <NavLink
            to="/nearby"
            className={({ isActive }) =>
              cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-slate-600 hover:bg-slate-50'
              )
            }
          >
            <MapPin className="w-4 h-4" />
            <span className="hidden sm:inline">Nearby</span>
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-slate-600 hover:bg-slate-50'
              )
            }
          >
            <Heart className="w-4 h-4" />
            <span className="hidden sm:inline">Saved</span>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
