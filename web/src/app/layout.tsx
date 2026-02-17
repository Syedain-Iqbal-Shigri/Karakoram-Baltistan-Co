import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://karakorambaltistan.com'),
  title: {
    template: '%s | Karakoram Baltistan Co.',
    default: 'K2 Base Camp Trek & Baltoro Glacier Tours | Karakoram Baltistan Co.',
  },
  description:
    'Expert-guided treks to K2 Base Camp, Baltoro Glacier and Gondogoro La. Licensed trekking company based in Skardu, Gilgit-Baltistan Pakistan.',
  keywords: [
    'K2 base camp trek',
    'Baltoro glacier trek',
    'Skardu tours',
    'Gilgit Baltistan trekking',
    'Pakistan adventure tours',
    'Karakoram expeditions',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Karakoram Baltistan Co.',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}