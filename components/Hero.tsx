import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'

interface HeroProps {
  section?: {
    title?: string
    richTitle?: any
    richSubtitle?: any
    ctaText?: string
    ctaLink?: string
    heroImage?: any
    heroBackgroundImage?: any
    backgroundColor?: string
    headingColor?: string
    textColor?: string
    buttonColor?: string
    buttonTextColor?: string
  }
}

const RedDecorator = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: '#DC2626' }}>{children}</span>
)

const ptComponents = {
  marks: {
    red: RedDecorator,
  },
}

export default function Hero({ section }: HeroProps) {
  // Always render consistent structure to avoid hydration mismatch
  const bgColor = section?.backgroundColor || '#ffffff'
  // Force black color as requested, ignoring Sanity field for now
  const headingColor = '#000000'
  const textColor = '#000000'
  const buttonBgColor = section?.buttonColor || headingColor
  const buttonTextColorVal = section?.buttonTextColor || '#ffffff'

  // CTA button text with fallback
  const ctaButtonText = section?.ctaText?.trim() || 'Discover Mentoria'
  // Only show button if we have a link and text
  const showButton = section?.ctaLink && ctaButtonText

  // Use fallback title to ensure consistent rendering
  const title = section?.title || 'Welcome'

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: bgColor }}
    >
      {section?.heroBackgroundImage?.asset && (
        <div className="absolute inset-0">
          <Image
            src={urlFor(section.heroBackgroundImage).width(1920).height(1080).url()}
            alt={section.heroBackgroundImage?.alt || 'Hero background'}
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
      )}
      <div className="relative z-10 max-w-4xl w-full text-center space-y-8">
        <div
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight"
          style={{ color: headingColor }}
        >
          {hasPortableTextContent(section?.richTitle) ? (
            <PortableText value={section!.richTitle} components={ptComponents} />
          ) : (
            <h1>{title}</h1>
          )}
        </div>

        {hasPortableTextContent(section?.richSubtitle) && (
          <div
            className="text-base sm:text-lg md:text-xl leading-relaxed"
            style={{ color: textColor }}
          >
            <PortableText value={section!.richSubtitle} components={ptComponents} />
          </div>
        )}

        {section?.heroImage?.asset && (
          <div className="flex justify-center">
            <Image
              src={urlFor(section.heroImage).width(520).height(360).url()}
              alt={section.heroImage?.alt || title || 'Hero image'}
              width={520}
              height={360}
              className="h-auto w-full max-w-lg rounded-2xl object-cover"
            />
          </div>
        )}

        {showButton && (
          <div className="pt-4">
            <a
              href={normalizeCtaLink(section!.ctaLink!)}
              className="inline-block px-8 py-3 sm:px-10 sm:py-4 font-semibold rounded-lg hover:opacity-90 transition-opacity"
              style={{
                backgroundColor: buttonBgColor,
                color: buttonTextColorVal
              }}
            >
              {ctaButtonText}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

function normalizeCtaLink(link: string) {
  if (link.startsWith('/mentoria')) return '/#mentoria'
  return link
}

function ensureContrast(color: string | undefined, background: string, fallback: string) {
  const chosen = color?.trim() || fallback
  const bg = parseHexColor(background)
  const fg = parseHexColor(chosen)
  if (!bg || !fg) return chosen

  const ratio = contrastRatio(bg.luminance, fg.luminance)
  if (ratio < 3) {
    return bg.luminance < 0.5 ? '#f9fafb' : '#111827'
  }
  return chosen
}

function parseHexColor(value: string) {
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

function hasPortableTextContent(blocks: any[]) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) return false
  return blocks.some(block => {
    if (block._type !== 'block' || !block.children) return true
    return block.children.some((child: any) => child.text && child.text.trim() !== '')
  })
}
