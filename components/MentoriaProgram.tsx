'use client'

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

        {mentoria.steps && mentoria.steps.length > 0 && (
          <div className="mb-12">
            <h3
              className="mb-6 text-2xl font-semibold"
              style={{ color: 'var(--text-color)' }}
            >
              Methodology
            </h3>
            <div className="space-y-6">
              {mentoria.steps.map((step: any) => (
                <div
                  key={step._id}
                  className="flex flex-col gap-4 rounded-2xl border p-6 shadow-sm sm:flex-row"
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.12)',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)'
                  }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold"
                    style={{
                      backgroundColor: 'var(--primary-color)',
                      color: 'var(--navbar-text-color)'
                    }}
                  >
                    {step.stepNumber}
                  </div>
                  <div className="flex-1">
                    <h4
                      className="text-xl font-semibold"
                      style={{ color: 'var(--text-color)' }}
                    >
                      {step.stepTitle}
                    </h4>
                    <p
                      className="mt-2 text-base leading-relaxed"
                      style={{ color: 'var(--text-color)', opacity: 0.85 }}
                    >
                      {step.stepDescription}
                    </p>
                  </div>
                </div>
              ))}
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
                    className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-sm font-semibold"
                    style={{
                      backgroundColor: 'var(--primary-color)',
                      color: 'var(--navbar-text-color)'
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
