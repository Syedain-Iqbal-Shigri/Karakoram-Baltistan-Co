'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

function PaymentContent() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get('bookingId')
  const advance = searchParams.get('advance')
  const total = searchParams.get('total')

  return (
    <div className="max-w-lg mx-auto text-center py-12">

      {/* Success Icon */}
      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-4xl">✓</span>
      </div>

      <h1 className="text-3xl font-bold text-stone-900 mb-3">
        Booking Received!
      </h1>

      <p className="text-stone-500 mb-8">
        Your booking has been submitted successfully. Our team will review your 
        request and contact you within 24 hours to confirm availability and 
        arrange payment.
      </p>

      {/* Booking Summary */}
      <div className="bg-stone-50 rounded-2xl p-6 text-left mb-8 space-y-3">
        <div className="flex justify-between">
          <span className="text-stone-500">Booking ID</span>
          <span className="font-mono font-medium text-stone-900">
            {bookingId?.slice(0, 8).toUpperCase()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-stone-500">Total Amount</span>
          <span className="font-semibold text-stone-900">
            ${parseInt(total || '0').toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between border-t border-stone-200 pt-3">
          <span className="text-emerald-700 font-medium">Advance (10%)</span>
          <span className="font-bold text-emerald-700">
            ${parseInt(advance || '0').toLocaleString()}
          </span>
        </div>
      </div>

      {/* Status Info */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8 text-left">
        <h3 className="font-bold text-amber-800 mb-2">📋 What Happens Next?</h3>
        <ol className="space-y-2 text-sm text-amber-700">
          <li>1. Our team reviews your booking request</li>
          <li>2. We check guide and permit availability for your date</li>
          <li>3. You receive a confirmation email within 24 hours</li>
          <li>4. Once confirmed, we send payment instructions</li>
          <li>5. Remaining balance paid cash on arrival in Skardu</li>
        </ol>
      </div>

      <div className="space-y-3">
        <Link
          href="/treks"
          className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-xl transition-colors"
        >
          Browse More Treks
        </Link>
        <Link
          href="/contact"
          className="block w-full border border-stone-300 hover:border-stone-400 text-stone-700 font-medium py-4 rounded-xl transition-colors"
        >
          Contact Us With Questions
        </Link>
      </div>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <PaymentContent />
    </Suspense>
  )
}
