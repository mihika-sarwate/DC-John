import Hero from '@/components/Hero'
import AboutSection from '@/components/About'
import MethodologySection from '@/components/MethodologySection'
import ServicesSection from '@/components/ServicesSection'
import PricingCard from '@/components/PricingCard'
import TestimonialCard from '@/components/TestimonialCard'
import BlogSection from '@/components/BlogSection'
import ContactSection from '@/components/ContactSection'
import MentoriaProgram from '@/components/MentoriaProgram'
import Footer from '@/components/Footer'
import { fetchSanityData } from '@/lib/sanity'
import {
  HERO_QUERY,
  ABOUT_QUERY,
  METHODOLOGY_QUERY,
  SERVICES_SECTION_QUERY,
  SERVICES_QUERY,
  PRICING_SECTION_QUERY,
  PRICING_QUERY,
  TESTIMONIALS_SECTION_QUERY,
  TESTIMONIALS_QUERY,
  BLOG_SECTION_QUERY,
  CONTACT_SECTION_QUERY,
  MENTORIA_QUERY,
  FOOTER_QUERY
} from '@/lib/queries'

export const revalidate = 60

export default async function Home() {
  // Fetch all section data in parallel
  const [
    heroSection,
    aboutSection,
    methodologySection,
    methodologySteps,
    servicesSection,
    services,
    pricingSection,
    pricingPlans,
    testimonialsSection,
    testimonials,
    blogSection,
    contactSection,
    mentoriaData,
    footerData
  ] = await Promise.all([
    fetchSanityData(HERO_QUERY),
    fetchSanityData(ABOUT_QUERY),
    fetchSanityData(MENTORIA_QUERY),
    fetchSanityData(METHODOLOGY_QUERY),
    fetchSanityData(SERVICES_SECTION_QUERY),
    fetchSanityData(SERVICES_QUERY),
    fetchSanityData(PRICING_SECTION_QUERY),
    fetchSanityData(PRICING_QUERY),
    fetchSanityData(TESTIMONIALS_SECTION_QUERY),
    fetchSanityData(TESTIMONIALS_QUERY),
    fetchSanityData(BLOG_SECTION_QUERY),
    fetchSanityData(CONTACT_SECTION_QUERY),
    fetchSanityData(MENTORIA_QUERY),
    fetchSanityData(FOOTER_QUERY)
  ])

  return (
    <main className="w-full">
      {/* Hero Section */}
      <Hero section={heroSection} />

      {/* About Section */}
      {aboutSection ? <AboutSection section={aboutSection} /> : null}

      {/* Methodology Section */}
      {methodologySection ? <MethodologySection section={methodologySection} steps={methodologySteps} /> : null}

      {/* Mentoria Section */}
      {mentoriaData ? <MentoriaProgram mentoria={mentoriaData} /> : null}

      {/* Services Section */}
      {servicesSection ? <ServicesSection section={servicesSection} services={services} /> : null}

      {/* Pricing Section */}
      {pricingSection && (
        <section 
          id="pricing"
          style={{ backgroundColor: pricingSection.backgroundColor || '#f9fafb' }} 
          className="px-6 py-16"
        >
          <div className="mx-auto max-w-7xl">
            {/* Section Header */}
            <div className="mb-12 text-center">
              {pricingSection.sectionTitle && (
                <h2 
                  style={{ color: pricingSection.headingColor || '#111827' }} 
                  className="mb-4 text-4xl font-bold md:text-5xl"
                >
                  {pricingSection.sectionTitle}
                </h2>
              )}
              {pricingSection.sectionSubtitle && (
                <p 
                  style={{ color: pricingSection.textColor || '#374151' }} 
                  className="mx-auto max-w-2xl text-lg leading-relaxed"
                >
                  {pricingSection.sectionSubtitle}
                </p>
              )}
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {pricingPlans && pricingPlans.length > 0 ? (
                pricingPlans.map((plan: any) => (
                  <PricingCard
                    key={plan._id}
                    plan={plan}
                    sectionHeadingColor={pricingSection.headingColor}
                    sectionTextColor={pricingSection.textColor}
                  />
                ))
              ) : (
                <p 
                  style={{ color: pricingSection.textColor || '#374151' }} 
                  className="col-span-full text-center"
                >
                  No pricing plans available.
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section 
        id="testimonials"
        style={{ backgroundColor: testimonialsSection?.backgroundColor || '#ffffff' }} 
        className="px-6 py-16"
      >
        <div className="mx-auto max-w-7xl">
          {testimonialsSection ? (
            <>
              {/* Section Header */}
              <div className="mb-12 text-center">
                {testimonialsSection.sectionTitle && (
                  <h2 
                    style={{ color: testimonialsSection.headingColor || '#111827' }} 
                    className="mb-4 text-4xl font-bold md:text-5xl"
                  >
                    {testimonialsSection.sectionTitle}
                  </h2>
                )}
                {testimonialsSection.sectionSubtitle && (
                  <p 
                    style={{ color: testimonialsSection.textColor || '#374151' }} 
                    className="mx-auto max-w-2xl text-lg leading-relaxed"
                  >
                    {testimonialsSection.sectionSubtitle}
                  </p>
                )}
              </div>

              {/* Testimonials Grid */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {testimonials && testimonials.length > 0 ? (
                  testimonials.map((testimonial: any) => (
                    <TestimonialCard
                      key={testimonial._id}
                      testimonial={testimonial}
                      sectionHeadingColor={testimonialsSection.headingColor}
                      sectionTextColor={testimonialsSection.textColor}
                    />
                  ))
                ) : (
                  <p 
                    style={{ color: testimonialsSection.textColor || '#374151' }} 
                    className="col-span-full text-center"
                  >
                    No testimonials available.
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="p-8 text-center bg-gray-50 rounded-lg">
              <p className="text-gray-600 font-semibold">Testimonials section data missing</p>
            </div>
          )}
        </div>
      </section>

      {/* Blog Section */}
      <BlogSection section={blogSection} />

      {/* Contact Section */}
      {contactSection && <ContactSection section={contactSection} />}

      {/* Footer */}
      {footerData && <Footer footer={footerData} services={services} />}
    </main>
  )
}
