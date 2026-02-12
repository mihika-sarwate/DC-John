import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import { fetchSanityData } from '@/lib/sanity'
import { NAVIGATION_QUERY, SITE_SETTINGS_QUERY } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'MENTORIA - Career Guidance',
  description: 'Career guidance platform',
}

export const dynamic = 'error'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await fetchSanityData(SITE_SETTINGS_QUERY)
  const navigation = await fetchSanityData(NAVIGATION_QUERY)

  const primaryColor = settings?.primaryColor || '#1a202c'
  const secondaryColor = settings?.secondaryColor || '#2d3748'
  const backgroundColor = settings?.backgroundColor || '#ffffff'
  const textColor = ensureReadableColor(settings?.textColor, backgroundColor)
  const navbarTextColor = ensureReadableColor(settings?.textColor, primaryColor)

  const style = {
    '--primary-color': primaryColor,
    '--secondary-color': secondaryColor,
    '--background-color': backgroundColor,
    '--text-color': textColor,
    '--navbar-text-color': navbarTextColor,
    backgroundColor: backgroundColor,
    color: textColor,
  } as React.CSSProperties

  return (
    <html lang="en">
      <body style={style}>
        <Navbar navigation={navigation} />
        {children}
      </body>
    </html>
  )
}

function ensureReadableColor(color: string | undefined, background: string) {
  const fallback = '#1f2937'
  const bg = parseHexColor(background)
  const fg = parseHexColor(color)

  if (!bg) return color || fallback
  if (!fg) return bg.luminance < 0.5 ? '#f9fafb' : '#111827'

  const ratio = contrastRatio(bg.luminance, fg.luminance)
  if (ratio < 3) {
    return bg.luminance < 0.5 ? '#f9fafb' : '#111827'
  }
  return color || fallback
}

function parseHexColor(value?: string) {
  if (!value) return null
  const hex = value.trim().replace('#', '')
  if (hex.length !== 3 && hex.length !== 6) return null
  const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.slice(0, 2), 16)
  const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.slice(2, 4), 16)
  const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.slice(4, 6), 16)
  if ([r, g, b].some((v) => Number.isNaN(v))) return null
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  return { r, g, b, luminance }
}

function contrastRatio(bgLuminance: number, fgLuminance: number) {
  const lighter = Math.max(bgLuminance, fgLuminance) + 0.05
  const darker = Math.min(bgLuminance, fgLuminance) + 0.05
  return lighter / darker
}
