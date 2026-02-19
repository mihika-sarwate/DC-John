'use client'

import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface Service {
  _id: string
  title: string
  description: string
  targetAudience?: string
  icon?: any
}

interface ServicesSectionProps {
  section?: {
    title?: string
    subtitle?: string
    backgroundColor?: string
    headingColor?: string
    textColor?: string
  }
  services?: Service[]
}

export default function ServicesSection({ section, services }: ServicesSectionProps) {
  if (!section) return null

  const bgColor = section.backgroundColor || '#ffffff'
  const headingColor = section.headingColor || '#1f2937'
  const textColor = section.textColor || '#4b5563'

  // Helper to normalize and check audience
  const belongsTo = (service: Service, keyword: string) =>
    service.targetAudience?.toLowerCase().includes(keyword.toLowerCase())

  const schoolServices = services?.filter(s => belongsTo(s, 'school')) || []
  const collegeServices = services?.filter(s => belongsTo(s, 'college')) || []
  const corporateServices = services?.filter(s => belongsTo(s, 'corporate')) || []

  // Any services that didn't match the specific categories (optional - to avoid hiding data)
  const otherServices = services?.filter(s =>
    !belongsTo(s, 'school') &&
    !belongsTo(s, 'college') &&
    !belongsTo(s, 'corporate')
  ) || []

  const renderServiceGrid = (items: Service[]) => (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16 last:mb-0">
      {items.map((service) => (
        <div
          key={service._id}
          className="p-6 rounded-lg border border-opacity-20 transition-all hover:bg-black/5"
          style={{
            borderColor: 'color-mix(in srgb, var(--text-color), transparent 85%)',
            backgroundColor: 'color-mix(in srgb, var(--text-color), transparent 97%)'
          }}
        >
          {service.icon && (
            <div className="mb-4">
              <Image
                src={service.icon?.asset ? urlFor(service.icon).width(64).height(64).url() : ''}
                alt={service.icon?.alt || service.title}
                width={64}
                height={64}
                className="h-16 w-16 object-contain"
              />
            </div>
          )}
          <h4
            className="text-xl sm:text-2xl font-semibold mb-3 h-auto"
            style={{ color: headingColor }}
          >
            {service.title}
          </h4>
          <p
            className="text-base sm:text-lg leading-relaxed mb-4"
            style={{ color: textColor }}
          >
            {service.description}
          </p>
          {/* Tag is less relevant now that they are grouped, but keeping for clarity if needed */}
        </div>
      ))}
    </div>
  )

  const renderSubsection = (title: string, items: Service[]) => {
    if (items.length === 0) return null
    return (
      <div className="mb-12 last:mb-0">
        <h3
          className="text-2xl sm:text-3xl font-bold mb-8 text-center"
          style={{ color: headingColor }}
        >
          {title}
        </h3>
        {renderServiceGrid(items)}
      </div>
    )
  }

  return (
    <section
      id="services"
      className="w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          {section.title && (
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              style={{ color: headingColor }}
            >
              {section.title}
            </h2>
          )}

          {section.subtitle && (
            <p
              className="text-lg sm:text-xl leading-relaxed"
              style={{ color: textColor }}
            >
              {section.subtitle}
            </p>
          )}
        </div>

        {/* Grouped Services */}
        {renderSubsection('For Schools', schoolServices)}
        {renderSubsection('For Colleges', collegeServices)}
        {renderSubsection('For Corporates', corporateServices)}

        {/* Fallback for uncategorized services */}
        {renderSubsection('Other Services', otherServices)}

        {(!services || services.length === 0) && (
          <p className="text-center text-gray-500">No services available.</p>
        )}
      </div>
    </section>
  )
}
