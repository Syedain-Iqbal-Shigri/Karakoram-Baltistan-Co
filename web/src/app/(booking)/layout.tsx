'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const trekData: Record<string, { title: string; pricePerPerson: number; durationDays: number; difficulty: string }> = {
  'k2-base-camp-trek': { title: 'K2 Base Camp Trek', pricePerPerson: 2200, durationDays: 18, difficulty: 'EXTREME' },
  'baltoro-glacier-trek': { title: 'Baltoro Glacier Trek', pricePerPerson: 1800, durationDays: 14, difficulty: 'DIFFICULT' },
  'gondogoro-la-trek': { title: 'Gondogoro La Trek', pricePerPerson: 2000, durationDays: 16, difficulty: 'EXTREME' },
  'snow-lake-trek': { title: 'Snow Lake Trek', pricePerPerson: 1900, durationDays: 17, difficulty: 'DIFFICULT' },
  'deosai-plains-jeep-safari': { title: 'Deosai Plains Jeep Safari', pricePerPerson: 350, durationDays: 3, difficulty: 'EASY' },
  'fairy-meadows-nanga-parbat': { title: 'Fairy Meadows & Nanga Parbat', pricePerPerson: 450, durationDays: 5, difficulty: 'MODERATE' },
}

export default function BookingPage({ params }: { params: { trekSlug: string } }) {
  const router = useRouter()
  const trek = trekData[params.trekSlug]

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    nationality: '',
    trekDate: '',
    numberOfPersons: 1,
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelation: '',
    specialRequests: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (!trek) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-stone-900">Trek not found</h1>
        <a href="/treks" className="text-emerald-600 mt-4 inline-block">
          Back to Trek Packages
        </a>
      </div>
    )
  }

  const totalAmount = trek.pricePerPerson * form.numberOfPersons
  const advanceAmount = Math.ceil(totalAmount * 0.1)
  const remainingAmount = totalAmount - advanceAmount

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === 'numberOfPersons' ? parseInt(value) : value,
    }))
  }

  const handleSubmit = async () => {
    setError('')
    if (!form.fullName || !form.email || !form.phone || !form.trekDate) {
      setError('Please fill in all required fields.')
      return
    }
    if (!form.emergencyName || !form.emergencyPhone) {
      setError('Emergency contact is required for safety.')
      return
    }
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trekSlug: params.trekSlug,
          trekTitle: trek.title,
          trekDate: form.trekDate,
          numberOfPersons: form.numberOfPersons,
          pricePerPerson: trek.pricePerPerson,
          totalAmount,
          advanceAmount,
          remainingAmount,
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          nationality: form.nationality,
          emergencyContact: {
            name: form.emergencyName,
            phone: form.emergencyPhone,
            relationship: form.emergencyRelation,
          },
          specialRequests: form.specialRequests,
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.error || 'Something went wrong.')
        setIsSubmitting(false)
        return
      }
      router.push(
        `/book/${params.trekSlug}/payment?bookingId=${data.bookingId}&advance=${advanceAmount}&total=${totalAmount}`
      )
    } catch {
      setError('Network error. Please try again.')
      setIsSubmitting(false)
    }
  }

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <div className="max-w-3xl mx-auto">

      <div className="mb-8">
        <a href={`/treks/${params.trekSlug}`} className="text-emerald-600 text-sm font-medium">
          ← Back to {trek.title}
        </a>
        <h1 className="text-3xl font-bold text-stone-900 mt-3">Book Your Trek</h1>
        <p className="text-stone-500 mt-1">
          Reserve your spot on <strong>{trek.title}</strong>
        </p>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-8">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <div className="font-bold text-stone-900 text-lg">{trek.title}</div>
            <div className="text-stone-500 text-sm">{trek.durationDays} Days · {trek.difficulty}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-stone-500">Price per person</div>
            <div className="text-2xl font-bold text-stone-900">
              ${trek.pricePerPerson.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">

        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-stone-900 mb-4">1. Your Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-1">Full Name *</label>
              <input type="text" name="fullName" value={form.fullName} onChange={handleChange}
                placeholder="As shown on passport"
                className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Email *</label>
              <input type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="your@email.com"
                className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Phone / WhatsApp *</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                placeholder="+1 234 567 8900"
                className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-1">Nationality</label>
              <input type="text" name="nationality" value={form.nationality} onChange={handleChange}
                placeholder="e.g. German, American, Pakistani"
                className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-stone-900 mb-4">2. Trek Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Departure Date *</label>
              <input type="date" name="trekDate" value={form.trekDate} onChange={handleChange}
                min={minDate}
                className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Number of Persons *</label>
              <select name="numberOfPersons" value={form.numberOfPersons} onChange={handleChange}
                className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                {[1,2,3,4,5,6,7,8,9,10,11,12].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'Persons'}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-stone-900 mb-1">3. Emergency Contact</h2>
          <p className="text-stone-500 text-sm mb-4">Required for all high-altitude treks.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Full Name *</label>
              <input type="text" name="emergencyName" value={form.emergencyName} onChange={handleChange}
                placeholder="Contact name"
                className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Phone *</label>
              <input type="tel" name="emergencyPhone" value={form.emergencyPhone} onChange={handleChange}
                placeholder="+1 234 567 8900"
                className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Relationship</label>
              <input type="text" name="emergencyRelation" value={form.emergencyRelation} onChange={handleChange}
                placeholder="e.g. Spouse, Parent"
                className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-stone-900 mb-2">4. Special Requests</h2>
          <textarea name="specialRequests" value={form.specialRequests} onChange={handleChange}
            rows={3} placeholder="Dietary needs, medical conditions, other requests..."
            className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" />
        </div>

        <div className="bg-stone-900 text-white rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-4">Price Summary</h2>
          <div className="flex justify-between text-stone-300 text-sm">
            <span>${trek.pricePerPerson.toLocaleString()} × {form.numberOfPersons} {form.numberOfPersons === 1 ? 'person' : 'persons'}</span>
            <span>${totalAmount.toLocaleString()}</span>
          </div>
          <div className="border-t border-stone-700 mt-3 pt-3 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${totalAmount.toLocaleString()}</span>
          </div>
          <div className="bg-emerald-600/20 border border-emerald-500/30 rounded-xl p-4 mt-4">
            <div className="flex justify-between text-emerald-300 font-bold">
              <span>Pay Now (10% Advance)</span>
              <span>${advanceAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-stone-400 text-xs mt-2">
              <span>Pay on Arrival in Skardu</span>
              <span>${remainingAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
            ⚠️ {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-300 text-white font-bold py-5 rounded-2xl text-xl transition-all"
        >
          {isSubmitting ? 'Processing...' : `Continue to Payment — $${advanceAmount.toLocaleString()} Advance`}
        </button>

        <p className="text-center text-stone-400 text-sm pb-8">
          🔒 Secure booking · Free cancellation up to 30 days before departure
        </p>

      </div>
    </div>
  )
}
