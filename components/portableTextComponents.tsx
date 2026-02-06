import { urlFor } from '@/lib/sanity'

export const portableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset) return null

      const src = urlFor(value).width(1200).auto('format').url()
      const alt = value?.alt || ''

      return (
        <figure className="my-6">
          <img
            src={src}
            alt={alt}
            className="w-full rounded-lg"
            loading="lazy"
          />
          {alt ? (
            <figcaption className="mt-2 text-sm opacity-80">{alt}</figcaption>
          ) : null}
        </figure>
      )
    }
  }
}
