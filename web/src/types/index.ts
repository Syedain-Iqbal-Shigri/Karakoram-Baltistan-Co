import type { Trek, Booking, User, BookingStatus, PaymentStatus } from '@prisma/client'

// Trek with booking count for listing page
export type TrekWithCount = Trek & {
  _count: {
    bookings: number
  }
}

// Booking with full relations for admin dashboard
export type BookingWithRelations = Booking & {
  user: User
  trek: Trek
}

// Itinerary day structure
export type ItineraryDay = {
  day: number
  title: string
  description: string
  accommodation?: string
  meals?: string
  altitude?: string
}

// Booking form data
export type BookingFormData = {
  trekId: string
  trekDate: string
  numberOfPersons: number
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
  specialRequests?: string
}

// API response wrapper
export type ApiResponse<T> = {
  data?: T
  error?: string
  message?: string
}