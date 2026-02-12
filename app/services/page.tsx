'use client'

import { useEffect } from 'react'

const target = '/#home'

export default function ServicesPage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.replace(target)
    }
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <p className="text-center">
        Redirecting to the home section...{' '}
        <a href={target} className="underline">
          Go now
        </a>
      </p>
    </main>
  )
}
