'use client'

import { useState } from 'react'
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

export default function Navbar({ navigation }: { navigation?: NavigationData | null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

  const logoUrl = navigation?.logo?.asset ? urlFor(navigation.logo).width(120).height(40).url() : undefined
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
        <div className="flex items-center justify-between h-16">
          {/* Logo/Site Name */}
          <a
            href="#home"
            onClick={(e) => handleAnchorClick(e, '#home')}
            className="flex items-center gap-3 text-lg sm:text-xl font-bold hover:opacity-80 transition-opacity cursor-pointer"
            style={{ color: 'inherit' }}
          >
            {logoUrl && (
              <img src={logoUrl} alt={logoAlt} className="h-8 w-auto" />
            )}
            {navigation?.brandName && <span>{navigation.brandName}</span>}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="text-base font-medium hover:opacity-80 transition-opacity cursor-pointer"
                style={{ color: 'inherit' }}
              >
                {link.label}
              </a>
            ))}
            {navigation?.ctaButton?.text && navigation?.ctaButton?.link && (
              <a
                href={navigation.ctaButton.link}
                onClick={(e) => handleCtaClick(e, navigation.ctaButton?.link)}
                className="ml-2 rounded-full px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-80"
                style={{ backgroundColor: navActive, color: navBg }}
              >
                {navigation.ctaButton.text}
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:opacity-80 transition-opacity"
            aria-label="Toggle menu"
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
          className="md:hidden"
          style={{ backgroundColor: navBg }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
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
                className="block rounded-md px-3 py-2 text-base font-semibold transition-opacity hover:opacity-80"
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
