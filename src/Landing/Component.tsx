import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import { LandingHero } from '@/Landing/components/Hero'
import { ServicesSection } from '@/Landing/components/Services'
import { AboutSection } from '@/Landing/components/About'
import { TestimonialsSection } from '@/Landing/components/Testimonials'
import { ContactSection } from '@/Landing/components/Contact'

// Define the expected type for the landing data to avoid TypeScript errors
type LandingData = {
  hero?: any
  services?: any
  about?: any
  testimonials?: any
  contact?: any
  formSettings?: any
}

export async function LandingPage() {
  // Change 'header' to 'landing' to fetch the correct global
  const landingData = (await getCachedGlobal('landing', 2)()) as unknown as LandingData

  if (!landingData) {
    return null
  }

  return (
    <>
      <LandingHero data={landingData.hero} />
      <ServicesSection data={landingData.services} />
      <AboutSection data={landingData.about} />
      <TestimonialsSection data={landingData.testimonials} />
      <ContactSection data={landingData.contact} formSettings={landingData.formSettings} />
    </>
  )
}
