'use client'

import { useState, useEffect } from 'react'
import { urlFor } from '@/lib/sanity'

type NavigationItem = {
  label?: string
  sectionId?: string
  order?: number
  isVisible?: boolean
}

type NavigationData = {
  logo?: any
  brandName?: string
  menuItems?: NavigationItem[]
  ctaButton?: {
    text?: string
    link?: string
  }
  backgroundColor?: string
  textColor?: string
  activeLinkColor?: string
}

// Logo component with proper sizing, fallback, and image error handling
function BrandLogo({
  logoUrl,
  logoAlt,
  brandName
}: {
  logoUrl?: string
  logoAlt: string
  brandName?: string
}) {
  const [imageError, setImageError] = useState(false)

  const hasLogo = logoUrl && !imageError
  const hasBrandName = brandName

  // If neither logo nor brand name, return null
  if (!hasLogo && !hasBrandName) {
    return null
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
      {/* Logo Container - Square logo support with proper sizing */}
      {hasLogo && (
        <div className="logo-container flex items-center justify-center flex-shrink-0 h-10 sm:h-12 md:h-14 w-10 sm:w-12 md:w-14 p-1">
          <img
            src={logoUrl}
            alt={logoAlt}
            onError={() => setImageError(true)}
            className="object-contain w-full h-full"
          />
        </div>
      )}

      {/* Brand Name */}
      {hasBrandName && (
        <span className="text-sm sm:text-base md:text-base font-bold whitespace-nowrap flex-shrink-0">
          {brandName}
        </span>
      )}
    </div>
  )
}

export default function Navbar({ navigation: initialNavigation }: { navigation?: NavigationData | null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [navigation, setNavigation] = useState<NavigationData | null | undefined>(initialNavigation)

  useEffect(() => {
    setNavigation(initialNavigation)
  }, [initialNavigation])

  useEffect(() => {
    const fetchNav = async () => {
      try {
        const { fetchSanityData } = await import('@/lib/sanity')
        const { NAVIGATION_QUERY } = await import('@/lib/queries')
        const data = await fetchSanityData(NAVIGATION_QUERY)
        if (data) setNavigation(data)
      } catch (e) {
        console.error('Failed to fetch live navigation:', e)
      }
    }
    fetchNav()
  }, [])

  const navLinks = (navigation?.menuItems || [])
    .filter((item) => item.isVisible !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((item) => ({
      href: item.sectionId ? `#${item.sectionId}` : '#',
      label: item.label || ''
    }))

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)

    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
      return
    }

    window.location.href = `/${href}`
  }

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, link?: string) => {
    if (!link) return
    if (link.startsWith('http')) return

    const targetHref = link.startsWith('#') ? link : `#${link}`
    handleAnchorClick(e, targetHref)
  }

  const logoUrl = navigation?.logo?.asset ? urlFor(navigation.logo).width(200).height(200).url() : undefined
  const logoAlt = navigation?.logo?.alt || navigation?.brandName || 'Brand logo'
  const navBg = navigation?.backgroundColor || 'var(--primary-color)'
  const navText = navigation?.textColor || 'var(--navbar-text-color)'
  const navActive = navigation?.activeLinkColor || navText

  return (
    <nav
      className="sticky top-0 z-50 shadow-md"
      style={{ backgroundColor: navBg, color: navText }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Fixed height navbar container */}
        <div className="flex items-center justify-between h-16 sm:h-16 md:h-16">
          {/* Logo/Brand Section - Clickable */}
          <a
            href="#home"
            onClick={(e) => handleAnchorClick(e, '#home')}
            className="flex items-center flex-shrink-0 hover:opacity-80 transition-opacity cursor-pointer"
            style={{ color: 'inherit' }}
            aria-label={`Go to home - ${navigation?.brandName || 'Brand'}`}
          >
            <BrandLogo
              logoUrl={logoUrl}
              logoAlt={logoAlt}
              brandName={navigation?.brandName}
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 flex-shrink-0 ml-auto">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="text-sm font-medium hover:opacity-80 transition-opacity cursor-pointer whitespace-nowrap"
                style={{ color: 'inherit' }}
              >
                {link.label}
              </a>
            ))}
            {navigation?.ctaButton?.text && navigation?.ctaButton?.link && (
              <a
                href={navigation.ctaButton.link}
                onClick={(e) => handleCtaClick(e, navigation.ctaButton?.link)}
                className="rounded-full px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-80"
                style={{ backgroundColor: navActive, color: navBg }}
              >
                {navigation.ctaButton.text}
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:opacity-80 transition-opacity flex-shrink-0 ml-auto"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-t"
          style={{ borderTopColor: `${navText}20` }}
        >
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="block px-3 py-2 rounded-md text-base font-medium hover:opacity-80 transition-opacity cursor-pointer"
                style={{ color: 'inherit' }}
              >
                {link.label}
              </a>
            ))}
            {navigation?.ctaButton?.text && navigation?.ctaButton?.link && (
              <a
                href={navigation.ctaButton.link}
                onClick={(e) => handleCtaClick(e, navigation.ctaButton?.link)}
                className="block rounded-md px-3 py-2 text-base font-semibold transition-opacity hover:opacity-80 mt-2"
                style={{ backgroundColor: navActive, color: navBg }}
              >
                {navigation.ctaButton.text}
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
