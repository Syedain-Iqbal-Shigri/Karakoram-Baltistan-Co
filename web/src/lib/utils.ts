// Calculate 10% advance and 90% remaining
export function calculateBookingAmounts(
  pricePerPerson: number,
  numberOfPersons: number
) {
  const totalAmount = pricePerPerson * numberOfPersons
  const advanceAmount = Math.ceil(totalAmount * 0.1 * 100) / 100
  const remainingAmount = Math.round((totalAmount - advanceAmount) * 100) / 100

  return {
    totalAmount,
    advanceAmount,
    remainingAmount,
  }
}

// Generate human-readable booking reference
// Example output: KE-2024-A1B2C3
export function generateBookingReference(): string {
  const year = new Date().getFullYear()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `KE-${year}-${random}`
}

// Format price for display
export function formatPrice(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

// Format date for display
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}