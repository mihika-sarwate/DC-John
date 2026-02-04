import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

type TestimonialCardProps = {
  testimonial: {
    _id: string
    name: string
    role?: string
    message: string
    avatarImage?: any
    organizationLogo?: any
    cardBackgroundColor?: string
    headingColor?: string
    textColor?: string
  }
  sectionHeadingColor?: string
  sectionTextColor?: string
}

export default function TestimonialCard({ 
  testimonial, 
  sectionHeadingColor, 
  sectionTextColor 
}: TestimonialCardProps) {
  const cardBg = testimonial.cardBackgroundColor?.trim() || '#ffffff'
  const headingColor = testimonial.headingColor?.trim() || sectionHeadingColor || '#111827'
  const textColor = testimonial.textColor?.trim() || sectionTextColor || '#374151'

  return (
    <article
      style={{ backgroundColor: cardBg }}
      className="rounded-lg p-8 shadow-md"
    >
      {/* Quote Marks */}
      <p style={{ color: headingColor }} className="text-4xl font-bold mb-4 opacity-30">
        "
      </p>

      {/* Message */}
      <p 
        style={{ color: textColor }} 
        className="text-lg leading-relaxed mb-6 italic"
      >
        {testimonial.message}
      </p>

      {/* Divider */}
      <div style={{ backgroundColor: headingColor }} className="h-1 w-12 mb-4 rounded"></div>

      {/* Avatar and Info */}
      <div className="flex items-center gap-3 mb-2">
        {testimonial.avatarImage && (
          <Image
            src={testimonial.avatarImage?.asset ? urlFor(testimonial.avatarImage).width(48).height(48).url() : ''}
            alt={testimonial.avatarImage?.alt || testimonial.name}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover"
          />
        )}
        <div>
          {/* Name */}
          <p 
            style={{ color: headingColor }} 
            className="text-base font-bold"
          >
            {testimonial.name}
          </p>

          {/* Role */}
          {testimonial.role && (
            <p 
              style={{ color: textColor }} 
              className="text-sm"
            >
              {testimonial.role}
            </p>
          )}
        </div>
      </div>

      {/* Organization Logo */}
      {testimonial.organizationLogo && (
        <div className="mt-4 pt-4 border-t" style={{ borderColor: `${headingColor}20` }}>
          <Image
            src={testimonial.organizationLogo?.asset ? urlFor(testimonial.organizationLogo).width(100).height(40).url() : ''}
            alt={testimonial.organizationLogo?.alt || 'Organization logo'}
            width={100}
            height={40}
            className="h-10 object-contain"
          />
        </div>
      )}
    </article>
  )
}
