import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

type PricingCardProps = {
  plan: {
    _id: string
    category?: string
    planName: string
    price: string
    shortDescription?: string
    planIcon?: any
    benefits?: string[]
    ctaText?: string
    ctaLink?: string
    isHighlighted?: boolean
    recommendedBadgeIcon?: any
    backgroundColor?: string
    headingColor?: string
    textColor?: string
  }
  sectionHeadingColor?: string
  sectionTextColor?: string
}

export default function PricingCard({ plan, sectionHeadingColor, sectionTextColor }: PricingCardProps) {
  const cardBg = plan.backgroundColor?.trim() || '#ffffff'
  const headingColor = plan.headingColor?.trim() || sectionHeadingColor || '#111827'
  const textColor = plan.textColor?.trim() || sectionTextColor || '#374151'
  const showCta = Boolean(plan.ctaText && plan.ctaLink)
  const ringClasses = plan.isHighlighted ? 'ring-4 ring-opacity-50' : ''

  return (
    <article
      style={{ backgroundColor: cardBg }}
      className={`relative rounded-2xl p-8 shadow-lg transition-transform hover:scale-105 ${ringClasses}`}
    >
      {plan.isHighlighted && (
        <div
          style={{ backgroundColor: headingColor, color: cardBg }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full px-6 py-1 text-sm font-semibold"
        >
          {plan.recommendedBadgeIcon && (
            <Image
              src={plan.recommendedBadgeIcon?.asset ? urlFor(plan.recommendedBadgeIcon).width(20).height(20).url() : ''}
              alt={plan.recommendedBadgeIcon?.alt || 'Recommended'}
              width={20}
              height={20}
              className="h-5 w-5 object-contain"
            />
          )}
          Recommended
        </div>
      )}

      {plan.planIcon && (
        <div className="mb-4">
          <Image
            src={urlFor(plan.planIcon).width(64).height(64).url()}
            alt={plan.planIcon?.alt || plan.planName}
            width={64}
            height={64}
            className="h-16 w-16 object-contain"
          />
        </div>
      )}

      {plan.category && (
        <p style={{ color: textColor }} className="mb-2 text-sm font-medium uppercase tracking-wide opacity-80">
          {plan.category}
        </p>
      )}

      <h3 style={{ color: headingColor }} className="mb-2 text-2xl font-bold">
        {plan.planName}
      </h3>

      <p style={{ color: headingColor }} className="mb-4 text-4xl font-extrabold">
        {plan.price}
      </p>

      {plan.shortDescription && (
        <p style={{ color: textColor }} className="mb-6 text-base leading-relaxed">
          {plan.shortDescription}
        </p>
      )}

      {plan.benefits && plan.benefits.length > 0 && (
        <ul className="mb-8 space-y-3">
          {plan.benefits.map((benefit: string, i: number) => (
            <li key={i} className="flex items-start gap-3">
              <svg
                className="mt-1 h-5 w-5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: headingColor }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span style={{ color: textColor }} className="text-base">
                {benefit}
              </span>
            </li>
          ))}
        </ul>
      )}

      {showCta && (
        <a
          href={plan.ctaLink}
          style={{
            backgroundColor: headingColor,
            color: cardBg
          }}
          className="mt-4 block w-full rounded-lg py-3 text-center text-base font-semibold transition-opacity hover:opacity-90"
        >
          {plan.ctaText}
        </a>
      )}
    </article>
  )
}
