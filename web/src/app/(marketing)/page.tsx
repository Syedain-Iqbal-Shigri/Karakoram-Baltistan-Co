import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'K2 Base Camp Trek & Baltoro Glacier Tours | Karakoram Baltistan Co.',
  description:
    'Book expert-guided treks to K2 Base Camp, Baltoro Glacier and Gondogoro La from Skardu. Only 10% advance payment. Trusted by 1000+ international trekkers.',
}

export default function HomePage() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-emerald-900 flex items-center">
        
        {/* Background overlay pattern */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            
            {/* Badge */}
            <div className="inline-flex items-center bg-emerald-600/20 border border-emerald-500/30 rounded-full px-4 py-1.5 mb-6">
              <span className="text-emerald-400 text-sm font-medium">
                📍 Based in Skardu, Gilgit-Baltistan
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Trek to the{' '}
              <span className="text-emerald-400">Roof of</span>{' '}
              the World
            </h1>

            <p className="text-xl text-stone-300 leading-relaxed mb-8 max-w-2xl">
              Expert-guided expeditions to K2 Base Camp, Baltoro Glacier, 
              and Gondogoro La. Experience the raw majesty of the Karakoram 
              range with Pakistan's most trusted trekking company.
            </p>

            {/* Key selling points */}
            <div className="flex flex-wrap gap-4 mb-10">
              {[
                '✓ Only 10% Advance Payment',
                '✓ Licensed & Insured Guides',
                '✓ Small Group Sizes',
                '✓ All Permits Included',
              ].map((point) => (
                <span
                  key={point}
                  className="text-sm text-emerald-300 font-medium"
                >
                  {point}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/treks"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all transform hover:scale-105"
              >
                View Trek Packages
              </Link>
              <Link
                href="/contact"
                className="border border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all"
              >
                Talk to an Expert
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-stone-400 text-sm">
          <span>Scroll to explore</span>
          <div className="mt-2 w-0.5 h-8 bg-gradient-to-b from-stone-400 to-transparent" />
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-emerald-700 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '500+', label: 'Successful Treks' },
              { number: '1000+', label: 'Happy Trekkers' },
              { number: '15+', label: 'Years Experience' },
              { number: '8611m', label: 'K2 Summit Height' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold text-white">
                  {stat.number}
                </div>
                <div className="text-emerald-200 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED TREKS SECTION */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">
              Our Signature Trek Packages
            </h2>
            <p className="text-stone-500 text-lg max-w-2xl mx-auto">
              From the world-famous Baltoro Glacier to the iconic K2 Base Camp — 
              every trek is a once-in-a-lifetime experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'K2 Base Camp Trek',
                slug: 'k2-base-camp-trek',
                duration: '18 Days',
                difficulty: 'Extreme',
                altitude: '5,150m',
                price: 2200,
                description:
                  'The ultimate Karakoram adventure. Trek through the legendary Baltoro Glacier to the base of the world\'s second highest peak.',
                color: 'from-stone-800 to-stone-600',
              },
              {
                title: 'Baltoro Glacier Trek',
                slug: 'baltoro-glacier-trek',
                duration: '14 Days',
                difficulty: 'Difficult',
                altitude: '4,900m',
                price: 1800,
                description:
                  'Walk the longest glacier outside polar regions. Pass Concordia — the throne room of the mountain gods.',
                color: 'from-emerald-800 to-emerald-600',
              },
              {
                title: 'Gondogoro La Trek',
                slug: 'gondogoro-la-trek',
                duration: '16 Days',
                difficulty: 'Extreme',
                altitude: '5,585m',
                price: 2000,
                description:
                  'Cross the legendary Gondogoro La pass for breathtaking views of K2, Broad Peak, and the Gasherbrum range.',
                color: 'from-blue-900 to-blue-700',
              },
            ].map((trek) => (
              <div
                key={trek.slug}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
              >
                {/* Image placeholder */}
                <div className={`h-48 bg-gradient-to-br ${trek.color} flex items-end p-6`}>
                  <div className="flex gap-2">
                    <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                      {trek.duration}
                    </span>
                    <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                      {trek.difficulty}
                    </span>
                    <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                      Max {trek.altitude}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-emerald-700 transition-colors">
                    {trek.title}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed mb-4">
                    {trek.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-stone-900">
                        ${trek.price}
                      </span>
                      <span className="text-stone-400 text-sm"> /person</span>
                    </div>
                    <Link
                      href={`/treks/${trek.slug}`}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      View Details
                    </Link>
                  </div>

                  <p className="text-xs text-emerald-600 font-medium mt-3">
                    ✓ Only ${Math.ceil(trek.price * 0.1)} advance • Rest pay on arrival
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/treks"
              className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-semibold px-8 py-3 rounded-xl transition-all"
            >
              View All Trek Packages
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">
              Why Trekkers Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '💳',
                title: '10% Advance Only',
                description:
                  'Reserve your trek with just 10% advance payment online. Pay the remaining 90% when you arrive in Skardu.',
              },
              {
                icon: '🏔️',
                title: 'Expert Local Guides',
                description:
                  'All our guides are from Gilgit-Baltistan with 10+ years experience on Karakoram trails and certified in wilderness first aid.',
              },
              {
                icon: '📋',
                title: 'All Permits Handled',
                description:
                  'We handle all Ministry of Tourism permits, Baltoro restricted zone permits, and national park fees on your behalf.',
              },
              {
                icon: '🛡️',
                title: 'Fully Licensed',
                description:
                  'Licensed by Pakistan Tourism Development Corporation (PTDC) and registered with Gilgit-Baltistan Tourism Department.',
              },
              {
                icon: '🌍',
                title: '1000+ International Trekkers',
                description:
                  'We have guided trekkers from 40+ countries including USA, Germany, Italy, Japan, and Australia.',
              },
              {
                icon: '🆘',
                title: 'Emergency Evacuation',
                description:
                  'Helicopter evacuation insurance available. Satellite communication on all expeditions above 4,000m.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl border border-stone-100 hover:border-emerald-200 hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-stone-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-gradient-to-r from-emerald-700 to-emerald-900 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready for Your Karakoram Adventure?
          </h2>
          <p className="text-emerald-200 text-lg mb-8">
            Booking season is open. Secure your spot with just 10% advance payment.
          </p>
          <Link
            href="/treks"
            className="bg-white text-emerald-700 hover:bg-emerald-50 font-bold px-10 py-4 rounded-xl text-lg transition-all transform hover:scale-105 inline-block"
          >
            Browse Trek Packages →
          </Link>
        </div>
      </section>
    </>
  )
}