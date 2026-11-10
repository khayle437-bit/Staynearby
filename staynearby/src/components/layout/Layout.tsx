import { Outlet } from 'react-router-dom'
import { Header } from './Header'

export function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-slate-100 bg-white py-6">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-slate-500">
          StayNearby · Find a place to stay, wherever your journey takes you.
        </div>
      </footer>
    </div>
  )
}
