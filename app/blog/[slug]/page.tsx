import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { client, urlFor } from '@/lib/sanity'
import { BLOG_POST_QUERY } from '@/lib/queries'

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

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post: BlogPost = await client.fetch(BLOG_POST_QUERY, {
    slug: params.slug,
  })

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">Blog post not found</h1>
      </div>
    )
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    } catch {
      return null
    }
  }

  const formattedDate = formatDate(post.publishDate)
  const thumbnailUrl = post.thumbnail?.asset
    ? urlFor(post.thumbnail).width(1200).height(600).url()
    : null

  return (
    <article className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {post.title || 'Untitled Article'}
          </h1>

          {(formattedDate || post.author) && (
            <div className="text-gray-600 text-sm flex flex-wrap gap-2 mb-6">
              {formattedDate && <span>{formattedDate}</span>}
              {formattedDate && post.author && <span>•</span>}
              {post.author && <span>By {post.author}</span>}
            </div>
          )}

          {post.excerpt && (
            <p className="text-xl text-gray-700 leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Thumbnail */}
        {thumbnailUrl && (
          <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden bg-gray-200">
            <Image
              src={thumbnailUrl}
              alt={post.thumbnail?.alt || post.title || 'Blog post image'}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        {post.content && (
          <div className="prose prose-lg max-w-none bg-white rounded-lg shadow-sm p-8">
            <PortableText
              value={post.content}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className="mb-4 text-gray-800 leading-relaxed">
                      {children}
                    </p>
                  ),
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold mb-4 mt-8 text-gray-900">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold mb-3 mt-6 text-gray-900">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-bold mb-2 mt-4 text-gray-900">
                      {children}
                    </h3>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-700">
                      {children}
                    </blockquote>
                  ),
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="list-disc ml-6 mb-4 space-y-2">
                      {children}
                    </ul>
                  ),
                  number: ({ children }) => (
                    <ol className="list-decimal ml-6 mb-4 space-y-2">
                      {children}
                    </ol>
                  ),
                },
                listItem: {
                  bullet: ({ children }) => (
                    <li className="text-gray-800">{children}</li>
                  ),
                  number: ({ children }) => (
                    <li className="text-gray-800">{children}</li>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <strong className="font-bold text-gray-900">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-gray-800">{children}</em>
                  ),
                  link: ({ children, value }) => (
                    <a
                      href={value?.href}
                      className="text-blue-600 hover:underline"
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

        {/* Back to Blog */}
        <div className="mt-8">
          <a
            href="/#blog"
            className="text-blue-600 hover:underline flex items-center gap-2"
          >
            ← Back to Blog
          </a>
        </div>
      </div>
    </article>
  )
}

export async function generateStaticParams() {
  const posts = await client.fetch(
    `*[_type == "blogPost"]{ "slug": slug.current }`
  )

  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }))
}
