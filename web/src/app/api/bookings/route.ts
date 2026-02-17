import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { generateBookingReference } from '@/lib/utils'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      trekSlug,
      trekTitle,
      trekDate,
      numberOfPersons,
      pricePerPerson,
      totalAmount,
      advanceAmount,
      remainingAmount,
      fullName,
      email,
      phone,
      nationality,
      emergencyContact,
      specialRequests,
    } = body

    // Basic validation
    if (!trekSlug || !trekDate || !numberOfPersons || !email || !fullName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Find or create user by email
    let user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: fullName,
          phone,
          nationality,
        },
      })
    } else {
      // Update user info
      user = await prisma.user.update({
        where: { email },
        data: { name: fullName, phone, nationality },
      })
    }

    // Find trek in DB or use slug
    let trekId: string | null = null
    try {
      const trek = await prisma.trek.findUnique({
        where: { slug: trekSlug },
      })
      if (trek) trekId = trek.id
    } catch {}

    // If no trek in DB yet, create a placeholder booking
    // In production, trek must exist in DB
    if (!trekId) {
      // Create temp trek record for now
      const tempTrek = await prisma.trek.upsert({
        where: { slug: trekSlug },
        update: {},
        create: {
          slug: trekSlug,
          title: trekTitle,
          description: trekTitle,
          pricePerPerson,
          durationDays: 1,
          maxGroupSize: 12,
          difficulty: 'MODERATE',
          maxAltitude: 5000,
          coverImage: '/placeholder.jpg',
          highlights: [],
          inclusions: [],
          exclusions: [],
          itinerary: [],
          keywords: [],
        },
      })
      trekId = tempTrek.id
    }

    // Create the booking
    const booking = await prisma.booking.create({
      data: {
        bookingReference: generateBookingReference(),
        userId: user.id,
        trekId,
        trekTitle,
        trekSlug,
        trekDate: new Date(trekDate),
        numberOfPersons,
        pricePerPerson,
        totalAmount,
        advanceAmount,
        remainingAmount,
        emergencyContact,
        specialRequests,
        bookingStatus: 'PENDING',
        paymentStatus: 'PENDING',
      },
    })

    return NextResponse.json({
      bookingId: booking.id,
      bookingReference: booking.bookingReference,
      clientSecret: null, // Will add Stripe later
      advanceAmount,
      totalAmount,
    })
  } catch (error) {
    console.error('[BOOKING_CREATE_ERROR]', error)
    return NextResponse.json(
      { error: 'Failed to create booking. Please try again.' },
      { status: 500 }
    )
  }
}