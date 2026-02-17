'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-emerald-700">
              Karakoram
            </span>
            <span className="text-2xl font-light text-stone-600">
              Baltistan Co.
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/treks"
              className="text-stone-600 hover:text-emerald-700 font-medium transition-colors"
            >
              Trek Packages
            </Link>
            <Link
              href="/about"
              className="text-stone-600 hover:text-emerald-700 font-medium transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-stone-600 hover:text-emerald-700 font-medium transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/treks"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg font-medium transition-colors"
            >
              Book a Trek
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 h-0.5 bg-stone-600 mb-1" />
            <div className="w-6 h-0.5 bg-stone-600 mb-1" />
            <div className="w-6 h-0.5 bg-stone-600" />
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/treks" className="block px-4 py-2 text-stone-600 hover:text-emerald-700">
              Trek Packages
            </Link>
            <Link href="/about" className="block px-4 py-2 text-stone-600 hover:text-emerald-700">
              About Us
            </Link>
            <Link href="/contact" className="block px-4 py-2 text-stone-600 hover:text-emerald-700">
              Contact
            </Link>
            <Link
              href="/treks"
              className="block mx-4 text-center bg-emerald-600 text-white px-5 py-2 rounded-lg font-medium"
            >
              Book a Trek
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}