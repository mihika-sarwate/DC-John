'use client'

import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'

type FooterProps = {
  footer?: {
    logo?: any
    brandName?: string
    description?: string
    socialLinks?: Array<{
      platform: string
      url: string
      icon?: any
    }>
    quickLinks?: Array<{
      label: string
      sectionId: string
    }>
    email?: string
    phone?: string
    address?: string
    copyrightText?: string
    madeByText?: string
    backgroundColor?: string
    headingColor?: string
    textColor?: string
    linkColor?: string
    accentColor?: string
  } | null
  services?: Array<{ title: string }>
}

const defaultFooter = {
  brandName: 'Mentoria',
  description: 'Empowering careers, transforming lives.',
  logo: undefined,
  socialLinks: [],
  quickLinks: [],
  email: 'contact@mentoria.com',
  phone: '+1 (000) 000-0000',
  address: 'Your address here',
  copyrightText: '© 2024 Mentoria. All rights reserved.',
  madeByText: 'Made with ❤️ by Mentoria',
  backgroundColor: '#1a1a1a',
  headingColor: '#ffffff',
  textColor: '#a0a0a0',
  linkColor: '#ffffff',
  accentColor: '#3b82f6'
}

const getSocialIconSVG = (platform: string) => {
  const icons: { [key: string]: string } = {
    instagram: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17" cy="7" r="1" fill="currentColor"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>`,
    facebook: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a2 2 0 012-2h3z"/></svg>`,
    twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 10.5 2.25 12.5-5a4.5 4.5 0 00.5-2v-.5"/></svg>`,
    youtube: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.54c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>`
  }
  return icons[platform] || icons.linkedin
}

export default function Footer({ footer, services = [] }: FooterProps) {
  const data = footer ?? defaultFooter
  const bg = data.backgroundColor?.trim() || defaultFooter.backgroundColor
  const headingColor = data.headingColor?.trim() || defaultFooter.headingColor
  const textColor = data.textColor?.trim() || defaultFooter.textColor
  const linkColor = data.linkColor?.trim() || defaultFooter.linkColor
  const accentColor = data.accentColor?.trim() || defaultFooter.accentColor

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const targetId = sectionId.startsWith('#') ? sectionId : `#${sectionId}`
    const element = document.querySelector(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer style={{ backgroundColor: bg, color: textColor }}>
      {/* Main Footer Content */}
      <div className="px-6 py-16 border-b" style={{ borderColor: `${accentColor}30` }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Column 1: Brand */}
            <div>
              {data.logo?.asset && (
                <div className="mb-4">
                  <Image
                    src={urlFor(data.logo).width(120).height(40).url()}
                    alt={data.logo?.alt || data.brandName || 'Brand logo'}
                    width={120}
                    height={40}
                    className="h-10 w-auto object-contain"
                  />
                </div>
              )}
              <h3
                className="mb-2 text-lg font-bold"
                style={{ color: headingColor }}
              >
                {data.brandName || 'Brand Name'}
              </h3>
              <p className="mb-6 text-sm leading-relaxed">
                {data.description || 'Brand description goes here.'}
              </p>

              {/* Social Links */}
              {data.socialLinks && data.socialLinks.length > 0 && (
                <div className="flex gap-4">
                  {data.socialLinks.map((social: any, idx: number) => (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:opacity-80"
                      style={{
                        backgroundColor: `${accentColor}20`,
                        color: linkColor
                      }}
                      title={social.platform}
                    >
                      {social.icon?.asset ? (
                        <Image
                          src={urlFor(social.icon).width(24).height(24).url()}
                          alt={social.icon?.alt || social.platform}
                          width={24}
                          height={24}
                          className="h-5 w-5 object-contain"
                        />
                      ) : (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: getSocialIconSVG(social.platform)
                          }}
                          className="h-5 w-5"
                        />
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4
                className="mb-6 text-sm font-semibold uppercase tracking-wider"
                style={{ color: headingColor }}
              >
                Quick Links
              </h4>
              <ul className="space-y-3">
                {data.quickLinks && data.quickLinks.length > 0 ? (
                  data.quickLinks.map((link: any, idx: number) => (
                    <li key={idx}>
                      <a
                        href={`#${link.sectionId}`}
                        onClick={(e) => handleSectionClick(e, link.sectionId)}
                        className="text-sm transition-colors hover:opacity-100"
                        style={{ color: linkColor }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))
                ) : (
                  <>
                    <li>
                      <a
                        href="#home"
                        onClick={(e) => handleSectionClick(e, 'home')}
                        className="text-sm transition-colors hover:opacity-100"
                        style={{ color: linkColor }}
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="#about"
                        onClick={(e) => handleSectionClick(e, 'about')}
                        className="text-sm transition-colors hover:opacity-100"
                        style={{ color: linkColor }}
                      >
                        About
                      </a>
                    </li>
                    <li>
                      <a
                        href="#services"
                        onClick={(e) => handleSectionClick(e, 'services')}
                        className="text-sm transition-colors hover:opacity-100"
                        style={{ color: linkColor }}
                      >
                        Services
                      </a>
                    </li>
                    <li>
                      <a
                        href="#contact"
                        onClick={(e) => handleSectionClick(e, 'contact')}
                        className="text-sm transition-colors hover:opacity-100"
                        style={{ color: linkColor }}
                      >
                        Contact
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Column 3: Services */}
            <div>
              <h4
                className="mb-6 text-sm font-semibold uppercase tracking-wider"
                style={{ color: headingColor }}
              >
                Our Services
              </h4>
              <ul className="space-y-3">
                {services && services.length > 0 ? (
                  services.map((service, idx) => (
                    <li
                      key={idx}
                      className="text-sm"
                    >
                      {service.title || 'Service'}
                    </li>
                  ))
                ) : (
                  <>
                    <li className="text-sm">Career Mentoring</li>
                    <li className="text-sm">Professional Development</li>
                    <li className="text-sm">Skill Training</li>
                    <li className="text-sm">Consulting</li>
                  </>
                )}
              </ul>
            </div>

            {/* Column 4: Contact Info */}
            <div>
              <h4
                className="mb-6 text-sm font-semibold uppercase tracking-wider"
                style={{ color: headingColor }}
              >
                Contact Info
              </h4>
              <div className="space-y-4">
                {data.email && (
                  <div>
                    <p className="text-xs font-semibold opacity-70" style={{ color: headingColor }}>
                      Email
                    </p>
                    <a
                      href={`mailto:${data.email}`}
                      className="text-sm transition-colors hover:opacity-100"
                      style={{ color: linkColor }}
                    >
                      {data.email}
                    </a>
                  </div>
                )}
                {data.phone && (
                  <div>
                    <p className="text-xs font-semibold opacity-70" style={{ color: headingColor }}>
                      Phone
                    </p>
                    <a
                      href={`tel:${data.phone}`}
                      className="text-sm transition-colors hover:opacity-100"
                      style={{ color: linkColor }}
                    >
                      {data.phone}
                    </a>
                  </div>
                )}
                {data.address && (
                  <div>
                    <p className="text-xs font-semibold opacity-70" style={{ color: headingColor }}>
                      Address
                    </p>
                    <p className="text-sm leading-relaxed">
                      {data.address}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-6 py-6">
        <div className="mx-auto max-w-7xl flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs" style={{ color: textColor }}>
            {data.copyrightText || defaultFooter.copyrightText}
          </p>
          <p className="text-xs" style={{ color: textColor }}>
            {data.madeByText || defaultFooter.madeByText}
          </p>
        </div>
      </div>
    </footer>
  )
}
