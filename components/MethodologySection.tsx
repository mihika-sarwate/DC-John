import { PortableText } from '@portabletext/react'
import { portableTextComponents } from './portableTextComponents'

interface MethodologySectionProps {
  section?: {
    title?: string
    backgroundColor?: string
    headingColor?: string
    textColor?: string
    content?: any[]
  }
}

export default function MethodologySection({ section }: MethodologySectionProps) {
  if (!section) return null

  const bgColor = section.backgroundColor || '#ffffff'
  const headingColor = section.headingColor || section.textColor || '#1f2937'
  const textColor = section.textColor || '#1f2937'

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
        </div>
        
        {section.content && section.content.length > 0 && (
          <div className="prose max-w-none mt-12" style={{ color: textColor }}>
            <PortableText value={section.content} components={portableTextComponents} />
          </div>
        )}
      </div>
    </section>
  )
}
