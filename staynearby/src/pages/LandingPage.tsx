import { useNavigate } from 'react-router-dom'
import { MapPin, Navigation, Heart, Search, Shield, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useGeolocation } from '@/hooks/useGeolocation'

export function LandingPage() {
  const navigate = useNavigate()
  const { requestLocation, isLoading, error, isDenied } = useGeolocation()

  const handleFindNearMe = () => {
    requestLocation()
    // Navigate after a short delay so store updates
    setTimeout(() => navigate('/nearby'), 300)
  }

  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative pt-16 pb-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-slate-50 -z-10" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-200/20 rounded-full blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100 text-teal-800 text-sm font-medium mb-6">
            <MapPin className="w-4 h-4" />
            Location-based hotel discovery
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
            Find a place to stay,{' '}
            <span className="text-teal-600">wherever your journey takes you</span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            Arriving late in an unfamiliar city? StayNearby instantly shows nearby hotels,
            contact details, and directions — so you can rest easy.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={handleFindNearMe}
              isLoading={isLoading}
              className="w-full sm:w-auto min-w-[220px]"
            >
              <Navigation className="w-5 h-5" />
              Find Hotels Near Me
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/nearby')}
              className="w-full sm:w-auto"
            >
              <Search className="w-5 h-5" />
              Explore Map
            </Button>
          </div>

          {(error || isDenied) && (
            <p className="mt-4 text-sm text-red-600 bg-red-50 inline-block px-4 py-2 rounded-lg">
              {error}
            </p>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">
            How StayNearby works
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-xl mx-auto">
            Three simple steps to find your next place to stay
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: 'Share your location',
                desc: 'Allow location access so we can find hotels around you instantly.',
              },
              {
                icon: Search,
                title: 'Compare options',
                desc: 'Browse nearby hotels with distances, contact info, and amenities.',
              },
              {
                icon: Navigation,
                title: 'Get directions',
                desc: 'Choose walking or driving and navigate straight to your hotel.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-teal-100 flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-teal-700" />
                </div>
                <h3 className="font-semibold text-lg text-slate-900">{item.title}</h3>
                <p className="mt-2 text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Heart,
              title: 'Save favorites',
              desc: 'Bookmark hotels for quick access later — even offline.',
            },
            {
              icon: Shield,
              title: 'Privacy first',
              desc: 'Your location is only used to find nearby places. Nothing is stored on servers.',
            },
            {
              icon: Smartphone,
              title: 'Works on any device',
              desc: 'Fully responsive — perfect on phone, tablet, or desktop.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm"
            >
              <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
