'use client'

import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface Step {
  _id: string
  stepNumber: number
  stepTitle: string
  stepDescription: string
  stepIcon?: any
}

interface MethodologySectionProps {
  section?: {
    title?: string
    subtitle?: string
    backgroundColor?: string
    headingColor?: string
    textColor?: string
  }
  steps?: Step[]
}

export default function MethodologySection({ section, steps }: MethodologySectionProps) {
  if (!section) return null

  const bgColor = section.backgroundColor || '#ffffff'
  const headingColor = section.headingColor || '#1f2937'
  const textColor = section.textColor || '#4b5563'
  const luminance = getLuminance(bgColor)
  const cardBackground = luminance < 0.5 ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.7)'
  const cardBorder = luminance < 0.5 ? 'rgba(255, 255, 255, 0.2)' : 'rgba(17, 24, 39, 0.08)'

  return (
    <section 
      id="methodology"
      className="w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          {section.title && (
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3"
              style={{ color: headingColor }}
            >
              {section.title}
            </h2>
          )}
          
          {section.subtitle && (
            <p 
              className="text-lg sm:text-xl leading-relaxed"
              style={{ color: textColor, opacity: 0.85 }}
            >
              {section.subtitle}
            </p>
          )}
        </div>

        {/* Steps Grid */}
        {steps && steps.length > 0 && (
          <div className="space-y-6">
            {steps.map((step) => (
              <div
                key={step._id}
                className="flex flex-col gap-6 rounded-2xl border p-6 shadow-sm sm:flex-row sm:items-start"
                style={{ backgroundColor: cardBackground, borderColor: cardBorder }}
              >
                {/* Step Number Badge */}
                <div className="flex-shrink-0">
                  <div 
                    className="flex items-center justify-center h-12 w-12 rounded-lg font-bold text-lg"
                    style={{ 
                      backgroundColor: headingColor,
                      color: '#ffffff'
                    }}
                  >
                    {step.stepNumber}
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  {step.stepIcon && (
                    <div className="mb-3">
                      <Image
                        src={step.stepIcon?.asset ? urlFor(step.stepIcon).width(48).height(48).url() : ''}
                        alt={step.stepIcon?.alt || step.stepTitle}
                        width={48}
                        height={48}
                        className="h-12 w-12 object-contain"
                      />
                    </div>
                  )}
                  <h3 
                    className="text-xl sm:text-2xl font-semibold mb-2"
                    style={{ color: headingColor }}
                  >
                    {step.stepTitle}
                  </h3>
                  <p 
                    className="text-base sm:text-lg leading-relaxed"
                    style={{ color: textColor }}
                  >
                    {step.stepDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function getLuminance(color: string) {
  const hex = color.replace('#', '')
  if (hex.length !== 3 && hex.length !== 6) return 1
  const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.slice(0, 2), 16)
  const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.slice(2, 4), 16)
  const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.slice(4, 6), 16)
  if ([r, g, b].some((value) => Number.isNaN(value))) return 1
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
}
