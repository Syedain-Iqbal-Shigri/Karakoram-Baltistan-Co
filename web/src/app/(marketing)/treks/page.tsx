import Link from 'next/link'
import type { Metadata } from 'next'
import { prisma } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Trek Packages — K2 Base Camp, Baltoro Glacier, Skardu Tours',
  description:
    'Browse all trek packages from Skardu. K2 Base Camp, Baltoro Glacier, Gondogoro La and more. Book with only 10% advance payment.',
  keywords: [
    'K2 base camp trek Pakistan',
    'Baltoro glacier trek',
    'Skardu trekking packages',
    'Karakoram expeditions',
    'Gilgit Baltistan tours',
  ],
}

// Fallback treks when database is empty
const fallbackTreks = [
  {
    id: '1',
    slug: 'k2-base-camp-trek',
    title: 'K2 Base Camp Trek',
    subtitle: '18 Days | Extreme | Max 5,150m',
    description: 'The ultimate Karakoram adventure. Trek through the legendary Baltoro Glacier to the base of the world\'s second highest peak.',
    pricePerPerson: 2200,
    durationDays: 18,
    difficulty: 'EXTREME',
    maxAltitude: 5150,
    isFeatured: true,
  },
  {
    id: '2',
    slug: 'baltoro-glacier-trek',
    title: 'Baltoro Glacier Trek',
    subtitle: '14 Days | Difficult | Max 4,900m',
    description: 'Walk the longest glacier outside polar regions. Pass Concordia — the throne room of the mountain gods.',
    pricePerPerson: 1800,
    durationDays: 14,
    difficulty: 'DIFFICULT',
    maxAltitude: 4900,
    isFeatured: true,
  },
  {
    id: '3',
    slug: 'gondogoro-la-trek',
    title: 'Gondogoro La Trek',
    subtitle: '16 Days | Extreme | Max 5,585m',
    description: 'Cross the legendary Gondogoro La pass for breathtaking views of K2, Broad Peak, and the Gasherbrum range.',
    pricePerPerson: 2000,
    durationDays: 16,
    difficulty: 'EXTREME',
    maxAltitude: 5585,
    isFeatured: false,
  },
  {
    id: '4',
    slug: 'snow-lake-trek',
    title: 'Snow Lake Trek',
    subtitle: '17 Days | Difficult | Max 5,151m',
    description: 'One of the world\'s great glacier journeys. Cross Hispar and Biafo glaciers to reach the stunning Snow Lake basin.',
    pricePerPerson: 1900,
    durationDays: 17,
    difficulty: 'DIFFICULT',
    maxAltitude: 5151,
    isFeatured: false,
  },
  {
    id: '5',
    slug: 'deosai-plains-jeep-safari',
    title: 'Deosai Plains Jeep Safari',
    subtitle: '3 Days | Easy | Max 4,114m',
    description: 'Explore the world\'s second highest plateau. Spot Himalayan brown bears, wildflowers and stunning landscapes.',
    pricePerPerson: 350,
    durationDays: 3,
    difficulty: 'EASY',
    maxAltitude: 4114,
    isFeatured: false,
  },
  {
    id: '6',
    slug: 'fairy-meadows-nanga-parbat',
    title: 'Fairy Meadows & Nanga Parbat Base Camp',
    subtitle: '5 Days | Moderate | Max 3,969m',
    description: 'Trek to the base of Nanga Parbat, the ninth highest mountain. Camp at the magical Fairy Meadows.',
    pricePerPerson: 450,
    durationDays: 5,
    difficulty: 'MODERATE',
    maxAltitude: 3969,
    isFeatured: false,
  },
]

const difficultyColors: Record<string, string> = {
  EASY: 'bg-green-100 text-green-700',
  MODERATE: 'bg-yellow-100 text-yellow-700',
  DIFFICULT: 'bg-orange-100 text-orange-700',
  EXTREME: 'bg-red-100 text-red-700',
}

export default async function TreksPage() {
  // Try to get treks from database, fall back to static data
  let treks: typeof fallbackTreks = []

  try {
    const dbTreks = await prisma.trek.findMany({
      where: { isActive: true },
      orderBy: [{ isFeatured: 'desc' }, { createdAt: 'asc' }],
    })
    treks = dbTreks.length > 0 ? dbTreks.map(t => ({
      ...t,
      pricePerPerson: Number(t.pricePerPerson),
    })) : fallbackTreks
  } catch {
    treks = fallbackTreks
  }

  return (
    <div className="min-h-screen bg-stone-50">

      {/* Page Header */}
      <div className="bg-gradient-to-br from-stone-900 to-emerald-900 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            Trek Packages
          </h1>
          <p className="text-stone-300 text-xl max-w-2xl mx-auto">
            From beginner-friendly Skardu day tours to extreme Karakoram 
            expeditions — find your perfect adventure.
          </p>
          <div className="mt-6 inline-flex items-center bg-emerald-600/30 border border-emerald-500/40 rounded-full px-5 py-2">
            <span className="text-emerald-300 text-sm font-medium">
              💳 All treks bookable with only 10% advance payment
            </span>
          </div>
        </div>
      </div>

      {/* Trek Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {treks.map((trek) => (
            <div
              key={trek.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-stone-100"
            >
              {/* Trek Image Placeholder */}
              <div className="h-52 bg-gradient-to-br from-stone-700 to-emerald-800 relative flex items-end p-5">
                {trek.isFeatured && (
                  <span className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    FEATURED
                  </span>
                )}
                <div className="flex flex-wrap gap-2">
                  <span className="bg-black/30 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                    {trek.durationDays} Days
                  </span>
                  <span className="bg-black/30 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                    {trek.maxAltitude.toLocaleString()}m max
                  </span>
                </div>
              </div>

              {/* Trek Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-xl font-bold text-stone-900 group-hover:text-emerald-700 transition-colors leading-tight">
                    {trek.title}
                  </h2>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ml-2 shrink-0 ${difficultyColors[trek.difficulty]}`}>
                    {trek.difficulty}
                  </span>
                </div>

                <p className="text-stone-500 text-sm leading-relaxed mb-5">
                  {trek.description.length > 120
                    ? trek.description.slice(0, 120) + '...'
                    : trek.description}
                </p>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                  <div>
                    <div className="text-2xl font-bold text-stone-900">
                      ${trek.pricePerPerson.toLocaleString()}
                    </div>
                    <div className="text-xs text-stone-400">per person</div>
                  </div>
                  <Link
                    href={`/treks/${trek.slug}`}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                  >
                    View Details →
                  </Link>
                </div>

                <div className="mt-3 text-xs text-emerald-600 font-medium">
                  ✓ Book now with ${Math.ceil(trek.pricePerPerson * 0.1)} advance only
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-white border-t border-stone-200 py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-stone-900 mb-3">
            Can't find what you're looking for?
          </h3>
          <p className="text-stone-500 mb-6">
            We offer custom treks and private expeditions tailored to your group size, 
            fitness level, and schedule.
          </p>
          <Link
            href="/contact"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Request Custom Trek
          </Link>
        </div>
      </div>
    </div>
  )
}
