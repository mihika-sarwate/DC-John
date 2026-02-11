import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/sanity'
import { portableTextComponents } from './portableTextComponents'

type CourseBlogEntry = {
  title?: string
  image?: any
  content?: any[]
}

type CoursesBlogSectionProps = {
  section?: {
    sectionTitle?: string
    entries?: CourseBlogEntry[]
  } | null
}

export default function CoursesBlogSection({ section }: CoursesBlogSectionProps) {
  if (!section?.entries || section.entries.length === 0) return null

  const title = section.sectionTitle?.trim() || 'COURSES & BLOG'

  return (
    <section id="courses-blog" className="w-full">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-10">
          {title}
        </h2>

        <div className="space-y-12">
          {section.entries.map((entry, index) => (
            <div key={`${entry.title || 'entry'}-${index}`}>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {entry.title || 'Untitled'}
              </h3>

              {entry.image && entry.image.asset && (
                <div className="mb-6 w-full">
                  <img
                    src={urlFor(entry.image).width(800).auto('format').url()}
                    alt={entry.image.alt || entry.title || 'Entry image'}
                    className="w-full rounded-lg mb-4"
                    loading="lazy"
                  />
                  {entry.image.alt && (
                    <p className="text-sm opacity-70">{entry.image.alt}</p>
                  )}
                </div>
              )}

              {entry.content && entry.content.length > 0 && (
                <PortableText
                  value={entry.content}
                  components={portableTextComponents as any}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
