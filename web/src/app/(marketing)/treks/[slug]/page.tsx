import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { prisma } from '@/lib/db'

// ─── Static trek data (used when DB is empty) ───────────────────────────────

const staticTreks: Record<string, any> = {
  'k2-base-camp-trek': {
    id: '1',
    slug: 'k2-base-camp-trek',
    title: 'K2 Base Camp Trek',
    subtitle: '18 Days | Extreme | Max Altitude 5,150m',
    description: `The K2 Base Camp Trek is widely regarded as one of the greatest trekking adventures on Earth. 
    Standing at the foot of K2 — the world's second highest and most dangerous mountain at 8,611m — is a 
    life-changing experience that very few people ever get to have.

    This epic journey takes you deep into the heart of the Karakoram range through the legendary Baltoro 
    Glacier — one of the longest glaciers outside the polar regions. Along the way you pass iconic 
    landmarks including Concordia, the "Throne Room of the Mountain Gods", where four of the world's 
    fourteen 8,000m peaks are visible simultaneously.`,
    highlights: [
      'Stand at K2 Base Camp (5,150m) — base of the world\'s second highest peak',
      'Trek the legendary Baltoro Glacier — 63km of pure wilderness',
      'Visit Concordia — views of K2, Broad Peak, Gasherbrum I & II simultaneously',
      'Pass through Urdukas, Goro II, and Broad Peak Base Camp',
      'Experience authentic Balti village culture in Askole',
      'Witness some of the most dramatic mountain scenery on Earth',
    ],
    inclusions: [
      'All meals during the trek (breakfast, lunch, dinner)',
      'Experienced licensed guide and support staff',
      'All camping equipment (tents, sleeping mats)',
      'Baltoro Restricted Zone permit',
      'National Park entry fees',
      'Porters for group equipment',
      'First aid kit and oxygen cylinder',
      'Transportation Skardu to Askole and back',
    ],
    exclusions: [
      'International flights to/from Pakistan',
      'Visa fees for Pakistan',
      'Personal trekking gear and clothing',
      'Personal porter (available at extra cost)',
      'Travel and medical insurance',
      'Helicopter evacuation insurance',
      'Tips for guides and porters',
    ],
    itinerary: [
      { day: 1, title: 'Arrive Islamabad / Skardu', description: 'Arrive in Islamabad or fly directly to Skardu. Transfer to hotel. Trek briefing and gear check.' },
      { day: 2, title: 'Skardu to Askole (3,049m)', description: 'Drive 6-7 hours through spectacular Braldu Gorge to Askole — the last village before the glacier.' },
      { day: 3, title: 'Askole to Jhula (3,169m)', description: 'First day on the trail. Trek along the Braldu River through sandy terrain to Jhula campsite.' },
      { day: 4, title: 'Jhola to Paiyu (3,369m)', description: 'Cross the Braldu River and trek to Paiyu — the last green campsite before the glacier.' },
      { day: 5, title: 'Rest Day at Paiyu', description: 'Acclimatization day. Optional hike to Paiyu Peak base. Enjoy the last trees and grass.' },
      { day: 6, title: 'Paiyu to Khoburtse (3,900m)', description: 'Enter the Baltoro Glacier. Trek on the moraine for 7-8 hours to Khoburtse campsite.' },
      { day: 7, title: 'Khoburtse to Urdukas (4,050m)', description: 'Trek along the glacier to Urdukas — one of the most scenic campsites in the Karakoram.' },
      { day: 8, title: 'Urdukas to Goro II (4,350m)', description: 'Full day on the glacier. First views of Gasherbrum massif. Camp on rocky moraine.' },
      { day: 9, title: 'Goro II to Concordia (4,600m)', description: 'Reach the legendary Concordia — confluence of Baltoro and Godwin-Austen glaciers. Views of K2, Broad Peak, Gasherbrum I & II.' },
      { day: 10, title: 'Concordia to K2 Base Camp (5,150m)', description: 'The ultimate day. Trek to the base of K2. Stand beneath the world\'s second highest peak.' },
      { day: 11, title: 'K2 BC to Broad Peak BC', description: 'Visit Broad Peak Base Camp. Spend the night near the giants.' },
      { day: 12, title: 'Return to Concordia', description: 'Begin the return journey. Views are just as spectacular on the way back.' },
      { day: 13, title: 'Concordia to Goro II', description: 'Retrace steps across the glacier.' },
      { day: 14, title: 'Goro II to Urdukas', description: 'Trek back along the glacier to Urdukas.' },
      { day: 15, title: 'Urdukas to Paiyu', description: 'Leave the glacier. Return to last green campsite.' },
      { day: 16, title: 'Paiyu to Askole', description: 'Final day on the trail. Return to Askole village.' },
      { day: 17, title: 'Askole to Skardu', description: 'Drive back to Skardu. Celebration dinner.' },
      { day: 18, title: 'Departure', description: 'Transfer to airport for onward journey. Trek completed.' },
    ],
    pricePerPerson: 2200,
    durationDays: 18,
    maxGroupSize: 12,
    minAge: 18,
    difficulty: 'EXTREME',
    maxAltitude: 5150,
    startLocation: 'Skardu',
    metaTitle: 'K2 Base Camp Trek — 18 Days from Skardu | Karakoram Baltistan Co.',
    metaDescription: 'Trek to K2 Base Camp (5,150m) in 18 days from Skardu. Expert guides, all permits included. Book with only $220 advance. Pakistan\'s most trusted K2 trek operator.',
    keywords: ['K2 base camp trek', 'K2 trek Pakistan', 'Baltoro glacier trek', 'Skardu K2 expedition'],
  },
  'baltoro-glacier-trek': {
    id: '2',
    slug: 'baltoro-glacier-trek',
    title: 'Baltoro Glacier Trek',
    subtitle: '14 Days | Difficult | Max Altitude 4,900m',
    description: `The Baltoro Glacier Trek takes you through one of the most spectacular mountain landscapes on Earth. 
    At 63km long, the Baltoro is one of the longest glaciers outside the polar regions, flanked by an extraordinary 
    concentration of the world's highest peaks.

    This trek reaches Concordia — the meeting point of the Baltoro and Godwin-Austen glaciers — where you are 
    surrounded by four 8,000m peaks simultaneously. It's one of the most awe-inspiring spots on the planet.`,
    highlights: [
      'Trek the full length of Baltoro Glacier (63km)',
      'Reach legendary Concordia (4,600m) — four 8,000m peaks visible at once',
      'Views of K2, Broad Peak, Gasherbrum I & II',
      'Camp at iconic Urdukas with panoramic Karakoram views',
      'Pass through authentic Balti villages',
      'World-class wilderness camping experience',
    ],
    inclusions: [
      'All meals during the trek',
      'Experienced licensed guide',
      'All camping equipment',
      'Baltoro Restricted Zone permit',
      'National Park fees',
      'Group equipment porters',
      'First aid and emergency kit',
      'Skardu to Askole transport',
    ],
    exclusions: [
      'International flights',
      'Pakistan visa',
      'Personal gear',
      'Personal porter',
      'Travel insurance',
      'Tips for staff',
    ],
    itinerary: [
      { day: 1, title: 'Arrive Skardu', description: 'Arrival and trek briefing.' },
      { day: 2, title: 'Skardu to Askole', description: 'Drive to last village before glacier.' },
      { day: 3, title: 'Askole to Jhula', description: 'First day trekking along Braldu River.' },
      { day: 4, title: 'Jhula to Paiyu', description: 'Trek to last green campsite.' },
      { day: 5, title: 'Paiyu Rest Day', description: 'Acclimatization and rest.' },
      { day: 6, title: 'Paiyu to Khoburtse', description: 'Enter Baltoro Glacier.' },
      { day: 7, title: 'Khoburtse to Urdukas', description: 'Spectacular glacier trekking.' },
      { day: 8, title: 'Urdukas to Goro II', description: 'Deep into the Karakoram.' },
      { day: 9, title: 'Goro II to Concordia', description: 'Reach the throne room of the gods.' },
      { day: 10, title: 'Rest Day at Concordia', description: 'Explore and acclimatize at 4,600m.' },
      { day: 11, title: 'Concordia to Urdukas', description: 'Begin return journey.' },
      { day: 12, title: 'Urdukas to Paiyu', description: 'Return to green campsite.' },
      { day: 13, title: 'Paiyu to Askole', description: 'Final trek day.' },
      { day: 14, title: 'Askole to Skardu & Departure', description: 'Drive back and depart.' },
    ],
    pricePerPerson: 1800,
    durationDays: 14,
    maxGroupSize: 12,
    minAge: 16,
    difficulty: 'DIFFICULT',
    maxAltitude: 4900,
    startLocation: 'Skardu',
    metaTitle: 'Baltoro Glacier Trek — 14 Days from Skardu | Karakoram Baltistan Co.',
    metaDescription: 'Trek the legendary Baltoro Glacier to Concordia in 14 days. See K2, Broad Peak and Gasherbrums. Book with $180 advance only.',
    keywords: ['Baltoro glacier trek', 'Concordia trek Pakistan', 'Skardu trekking'],
  },
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  let trek = staticTreks[params.slug]

  try {
    const dbTrek = await prisma.trek.findUnique({
      where: { slug: params.slug },
    })
    if (dbTrek) trek = dbTrek
  } catch {}

  if (!trek) return {}

  return {
    title: trek.metaTitle ?? trek.title,
    description: trek.metaDescription ?? trek.description.slice(0, 160),
    keywords: trek.keywords ?? [],
    openGraph: {
      title: trek.metaTitle ?? trek.title,
      description: trek.metaDescription ?? trek.description.slice(0, 160),
      type: 'article',
    },
    alternates: {
      canonical: `/treks/${trek.slug}`,
    },
  }
}

// ─── Difficulty badge colors ──────────────────────────────────────────────────

const difficultyColors: Record<string, string> = {
  EASY: 'bg-green-100 text-green-700',
  MODERATE: 'bg-yellow-100 text-yellow-700',
  DIFFICULT: 'bg-orange-100 text-orange-700',
  EXTREME: 'bg-red-100 text-red-700',
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default async function TrekDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  let trek = staticTreks[params.slug]

  try {
    const dbTrek = await prisma.trek.findUnique({
      where: { slug: params.slug, isActive: true },
    })
    if (dbTrek) trek = { ...dbTrek, pricePerPerson: Number(dbTrek.pricePerPerson) }
  } catch {}

  if (!trek) notFound()

  const advanceAmount = Math.ceil(trek.pricePerPerson * 0.1)
  const remainingAmount = trek.pricePerPerson - advanceAmount

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-emerald-900 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${difficultyColors[trek.difficulty]}`}>
              {trek.difficulty}
            </span>
            <span className="bg-white/10 text-white text-sm px-3 py-1 rounded-full">
              {trek.durationDays} Days
            </span>
            <span className="bg-white/10 text-white text-sm px-3 py-1 rounded-full">
              Max {trek.maxAltitude.toLocaleString()}m
            </span>
            <span className="bg-white/10 text-white text-sm px-3 py-1 rounded-full">
              From {trek.startLocation}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {trek.title}
          </h1>
          {trek.subtitle && (
            <p className="text-emerald-300 text-xl mb-8">{trek.subtitle}</p>
          )}

          {/* Booking Card in Hero */}
          <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mt-4">
            <div className="flex flex-wrap items-center gap-6">
              <div>
                <div className="text-stone-400 text-sm">Price per person</div>
                <div className="text-4xl font-bold text-white">
                  ${trek.pricePerPerson.toLocaleString()}
                </div>
              </div>
              <div className="border-l border-white/20 pl-6">
                <div className="text-emerald-300 text-sm font-medium">
                  Pay now (10% advance)
                </div>
                <div className="text-2xl font-bold text-emerald-400">
                  ${advanceAmount}
                </div>
                <div className="text-stone-400 text-xs">
                  ${remainingAmount.toLocaleString()} pay on arrival in Skardu
                </div>
              </div>
              <Link
                href={`/book/${trek.slug}`}
                className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all transform hover:scale-105"
              >
                Book This Trek
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* LEFT — Main Content */}
          <div className="lg:col-span-2 space-y-12">

            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                Trek Overview
              </h2>
              <div className="text-stone-600 leading-relaxed whitespace-pre-line">
                {trek.description}
              </div>
            </section>

            {/* Highlights */}
            {trek.highlights?.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-stone-900 mb-4">
                  Trek Highlights
                </h2>
                <ul className="space-y-3">
                  {trek.highlights.map((h: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                      <span className="text-stone-600">{h}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Itinerary */}
            {trek.itinerary?.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-stone-900 mb-6">
                  Day-by-Day Itinerary
                </h2>
                <div className="space-y-4">
                  {trek.itinerary.map((day: any, i: number) => (
                    <div
                      key={i}
                      className="flex gap-4 p-4 rounded-xl border border-stone-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-colors"
                    >
                      <div className="shrink-0 w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-bold text-sm">
                        D{day.day}
                      </div>
                      <div>
                        <div className="font-semibold text-stone-900">
                          {day.title}
                        </div>
                        <div className="text-stone-500 text-sm mt-1">
                          {day.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Inclusions / Exclusions */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {trek.inclusions?.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-stone-900 mb-4">
                    ✅ What's Included
                  </h2>
                  <ul className="space-y-2">
                    {trek.inclusions.map((item: string, i: number) => (
                      <li key={i} className="text-stone-600 text-sm flex items-start gap-2">
                        <span className="text-emerald-500 mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {trek.exclusions?.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-stone-900 mb-4">
                    ❌ Not Included
                  </h2>
                  <ul className="space-y-2">
                    {trek.exclusions.map((item: string, i: number) => (
                      <li key={i} className="text-stone-600 text-sm flex items-start gap-2">
                        <span className="text-red-400 mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          </div>

          {/* RIGHT — Sticky Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-stone-200 rounded-2xl shadow-lg p-6 space-y-5">
              <h3 className="text-xl font-bold text-stone-900">
                Book This Trek
              </h3>

              {/* Price Breakdown */}
              <div className="bg-stone-50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between text-stone-600">
                  <span>Price per person</span>
                  <span className="font-semibold">
                    ${trek.pricePerPerson.toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-stone-200 pt-3">
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Pay now (10%)</span>
                    <span>${advanceAmount}</span>
                  </div>
                  <div className="flex justify-between text-stone-500 text-sm mt-1">
                    <span>Pay on arrival (90%)</span>
                    <span>${remainingAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Trek Details */}
              <div className="space-y-2 text-sm">
                {[
                  { label: '📅 Duration', value: `${trek.durationDays} Days` },
                  { label: '🏔️ Max Altitude', value: `${trek.maxAltitude.toLocaleString()}m` },
                  { label: '👥 Max Group', value: `${trek.maxGroupSize} people` },
                  { label: '🎂 Min Age', value: `${trek.minAge} years` },
                  { label: '📍 Starts At', value: trek.startLocation },
                ].map((detail) => (
                  <div key={detail.label} className="flex justify-between">
                    <span className="text-stone-500">{detail.label}</span>
                    <span className="font-medium text-stone-800">
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Book Button */}
              <Link
                href={`/book/${trek.slug}`}
                className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl text-center text-lg transition-colors"
              >
                Book Now — ${advanceAmount} Advance
              </Link>

              <p className="text-xs text-stone-400 text-center">
                Remaining ${remainingAmount.toLocaleString()} paid cash on arrival in Skardu.
                Free cancellation up to 30 days before departure.
              </p>

              {/* Contact */}
              <div className="border-t border-stone-100 pt-4 text-center">
                <p className="text-sm text-stone-500 mb-2">
                  Questions? Talk to our experts
                </p>
                <Link
                  href="/contact"
                  className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                >
                  📞 Contact Us →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schema.org Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TouristTrip',
            name: trek.title,
            description: trek.description.slice(0, 300),
            url: `https://karakorambaltistan.com/treks/${trek.slug}`,
            touristType: 'Adventure Trekking',
            offers: {
              '@type': 'Offer',
              price: trek.pricePerPerson,
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
            },
            provider: {
              '@type': 'TouristInformationCenter',
              name: 'Karakoram Baltistan Co.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Skardu',
                addressRegion: 'Gilgit-Baltistan',
                addressCountry: 'PK',
              },
            },
          }),
        }}
      />
    </div>
  )
}
