import Image from 'next/image'
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
                <div className="mb-6 w-full relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={urlFor(entry.image).width(800).auto('format').url()}
                    alt={entry.image.alt || entry.title || 'Entry image'}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-cover"
                  />
                  {entry.image.alt && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-white text-xs opacity-0 hover:opacity-100 transition-opacity">
                      {entry.image.alt}
                    </div>
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
