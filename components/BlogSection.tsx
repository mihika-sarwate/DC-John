import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

type BlogPost = {
  _id: string
  title?: string
  excerpt?: string
  articleLink?: string
  thumbnail?: any
  openInNewTab?: boolean
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
    ctaText?: string
    ctaLink?: string
  } | null
}

export default function BlogSection({ section }: BlogSectionProps) {
  // If no section data or no articles, don't render
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
        {/* Section Header */}
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

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {section.articles.slice(0, 3).map((article) => (
            <BlogCard
              key={article._id}
              article={article}
              cardBgColor={cardBgColor}
              cardHeadingColor={cardHeadingColor}
              cardTextColor={cardTextColor}
            />
          ))}
        </div>

        {/* CTA Button */}
        {section.ctaText && section.ctaLink && (
          <div className="text-center">
            <a
              href={section.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 font-semibold rounded-lg transition-opacity hover:opacity-90"
              style={{
                backgroundColor: headingColor,
                color: bgColor
              }}
            >
              {section.ctaText}
            </a>
          </div>
        )}
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

  const target = article.openInNewTab !== false ? '_blank' : '_self'
  const rel = article.openInNewTab !== false ? 'noopener noreferrer' : undefined

  return (
    <a
      href={article.articleLink || '#'}
      target={target}
      rel={rel}
      className="group block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
      style={{ backgroundColor: cardBgColor }}
    >
      {/* Thumbnail */}
      {thumbnailUrl && (
        <div className="relative w-full h-48 overflow-hidden bg-gray-100">
          <Image
            src={thumbnailUrl}
            alt={article.thumbnail?.alt || article.title || 'Blog post thumbnail'}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <h3
          style={{ color: cardHeadingColor }}
          className="text-xl font-bold mb-3 line-clamp-2 group-hover:underline"
        >
          {article.title || 'Untitled Article'}
        </h3>

        {article.excerpt && (
          <p
            style={{ color: cardTextColor }}
            className="text-base leading-relaxed line-clamp-2 mb-4"
          >
            {article.excerpt}
          </p>
        )}

        <div
          style={{ color: cardHeadingColor }}
          className="text-sm font-semibold inline-flex items-center gap-2"
        >
          Read Article
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </a>
  )
}
