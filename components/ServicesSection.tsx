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

        {/* Services Grid */}
        {services && services.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service._id}
                className="p-6 rounded-lg border border-opacity-20"
                style={{ 
                  borderColor: headingColor,
                  backgroundColor: `${bgColor}dd`
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
                <h3 
                  className="text-xl sm:text-2xl font-semibold mb-3"
                  style={{ color: headingColor }}
                >
                  {service.title}
                </h3>
                <p 
                  className="text-base sm:text-lg leading-relaxed mb-4"
                  style={{ color: textColor }}
                >
                  {service.description}
                </p>
                {service.targetAudience && (
                  <p 
                    className="text-sm font-medium"
                    style={{ color: headingColor }}
                  >
                    For: {service.targetAudience}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
