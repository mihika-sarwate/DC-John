import { PortableText } from '@portabletext/react'
import { portableTextComponents } from './portableTextComponents'

export default function MentoriaProgram({ mentoria }: any) {
  if (!mentoria) return <div>No mentoria data</div>

  return (
    <section id="mentoria" className="w-full px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2
            className="text-3xl font-bold sm:text-4xl"
            style={{ color: 'var(--text-color)' }}
          >
            {mentoria.title}
          </h2>
          {mentoria.description && (
            <p
              className="mt-4 text-base leading-relaxed sm:text-lg"
              style={{ color: 'var(--text-color)', opacity: 0.85 }}
            >
              {mentoria.description}
            </p>
          )}
        </div>

        {mentoria.methodologyContent && mentoria.methodologyContent.length > 0 && (
          <div className="mb-12">
            <h3
              className="mb-6 text-2xl font-semibold"
              style={{ color: 'var(--text-color)' }}
            >
              Methodology
            </h3>
            <div className="prose max-w-none" style={{ color: 'var(--text-color)' }}>
              <PortableText value={mentoria.methodologyContent} components={portableTextComponents} />
            </div>
          </div>
        )}

        {mentoria.features && mentoria.features.length > 0 && (
          <div>
            <h3
              className="mb-6 text-2xl font-semibold"
              style={{ color: 'var(--text-color)' }}
            >
              Features
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {mentoria.features.map((feature: string, i: number) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border px-4 py-3"
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.12)',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)'
                  }}
                >
                  <span
                    className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-sm font-semibold flex-shrink-0"
                    style={{
                      backgroundColor: mentoria.featureBadgeColor || '#2563eb',
                      color: mentoria.featureBadgeTextColor || '#ffffff'
                    }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-base" style={{ color: 'var(--text-color)', opacity: 0.9 }}>
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
