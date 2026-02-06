import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/sanity'

type BlogPost = {
  _id: string
  title?: string
  slug?: { current: string }
  excerpt?: string
  author?: string
  publishDate?: string
  thumbnail?: any
  content?: any[]
}

type BlogSectionProps = {
  section?: {
    sectionTitle?: string
    sectionSubtitle?: string
    backgroundColor?: string
    headingColor?: string
    textColor?: string
    cardBackgroundColor?: string
    cardHeadingColor?: string
    cardTextColor?: string
    articles?: BlogPost[]
  } | null
}

export default function BlogSection({ section }: BlogSectionProps) {
  if (!section || !section.articles || section.articles.length === 0) {
    return null
  }

  const bgColor = section.backgroundColor || '#ffffff'
  const headingColor = section.headingColor || '#111827'
  const textColor = section.textColor || '#374151'
  const cardBgColor = section.cardBackgroundColor || '#ffffff'
  const cardHeadingColor = section.cardHeadingColor || '#111827'
  const cardTextColor = section.cardTextColor || '#374151'

  return (
    <section
      id="blog"
      className="px-6 py-16"
      style={{ backgroundColor: bgColor }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          {section.sectionTitle && (
            <h2
              style={{ color: headingColor }}
              className="mb-4 text-4xl font-bold md:text-5xl"
            >
              {section.sectionTitle}
            </h2>
          )}
          {section.sectionSubtitle && (
            <p
              style={{ color: textColor }}
              className="mx-auto max-w-2xl text-lg leading-relaxed"
            >
              {section.sectionSubtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {section.articles.map((article) => (
            <BlogCard
              key={article._id}
              article={article}
              cardBgColor={cardBgColor}
              cardHeadingColor={cardHeadingColor}
              cardTextColor={cardTextColor}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function BlogCard({
  article,
  cardBgColor,
  cardHeadingColor,
  cardTextColor
}: {
  article: BlogPost
  cardBgColor: string
  cardHeadingColor: string
  cardTextColor: string
}) {
  const thumbnailUrl = article.thumbnail?.asset
    ? urlFor(article.thumbnail).width(600).height(400).url()
    : null

  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    try {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
      }).format(new Date(dateString))
    } catch {
      return null
    }
  }

  const formattedDate = formatDate(article.publishDate)

  return (
    <div
      className="rounded-lg overflow-hidden shadow-md"
      style={{ backgroundColor: cardBgColor }}
    >
      {thumbnailUrl && (
        <div className="relative w-full h-48 overflow-hidden bg-gray-100">
          <Image
            src={thumbnailUrl}
            alt={article.thumbnail?.alt || article.title || 'Blog post thumbnail'}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="p-6">
        {(formattedDate || article.author) && (
          <div
            style={{ color: cardTextColor, opacity: 0.75 }}
            className="text-sm mb-3 flex flex-wrap gap-2"
          >
            {formattedDate && <span>{formattedDate}</span>}
            {formattedDate && article.author && <span>•</span>}
            {article.author && <span>By {article.author}</span>}
          </div>
        )}

        <h3
          style={{ color: cardHeadingColor }}
          className="text-xl font-bold mb-3"
        >
          {article.title || 'Untitled Article'}
        </h3>

        {article.excerpt && (
          <p
            style={{ color: cardTextColor }}
            className="text-base leading-relaxed mb-4"
          >
            {article.excerpt}
          </p>
        )}

        {article.content && article.content.length > 0 && (
          <div className="mt-4 prose prose-sm max-w-none">
            <PortableText
              value={article.content}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p
                      style={{ color: cardTextColor }}
                      className="mb-3 leading-relaxed"
                    >
                      {children}
                    </p>
                  ),
                  h1: ({ children }) => (
                    <h1
                      style={{ color: cardHeadingColor }}
                      className="text-2xl font-bold mb-3 mt-4"
                    >
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2
                      style={{ color: cardHeadingColor }}
                      className="text-xl font-bold mb-2 mt-3"
                    >
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3
                      style={{ color: cardHeadingColor }}
                      className="text-lg font-bold mb-2 mt-3"
                    >
                      {children}
                    </h3>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote
                      style={{ borderLeftColor: cardHeadingColor }}
                      className="border-l-4 pl-4 italic my-3"
                    >
                      {children}
                    </blockquote>
                  ),
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="list-disc ml-6 mb-3 space-y-1">
                      {children}
                    </ul>
                  ),
                  number: ({ children }) => (
                    <ol className="list-decimal ml-6 mb-3 space-y-1">
                      {children}
                    </ol>
                  ),
                },
                listItem: {
                  bullet: ({ children }) => (
                    <li style={{ color: cardTextColor }}>{children}</li>
                  ),
                  number: ({ children }) => (
                    <li style={{ color: cardTextColor }}>{children}</li>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <strong className="font-bold">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic">{children}</em>
                  ),
                  link: ({ children, value }) => (
                    <a
                      href={value?.href}
                      style={{ color: cardHeadingColor }}
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
