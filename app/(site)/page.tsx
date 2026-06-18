import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import StatsSection from '@/components/home/StatsSection'
import ServicesOverview from '@/components/home/ServicesOverview'
import WhyUs from '@/components/home/WhyUs'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import Testimonials from '@/components/home/Testimonials'
import BlogPreview from '@/components/home/BlogPreview'
import CtaBanner from '@/components/home/CtaBanner'

export const metadata: Metadata = {
  title: '2AC SARL — BTP, Logistique & Commerce à Conakry',
  description:
    "2AC SARL : entreprise multisectorielle guinéenne spécialisée en BTP, commerce de carreaux, logistique internationale, import-export et conseil. Basée à Lambanyi, Conakry.",
}

// Revalidation ISR : les modifications faites dans Supabase apparaissent
// au plus tard après 60 secondes, sans redéploiement.
export const revalidate = 60

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <ServicesOverview />
      <WhyUs />
      <FeaturedProjects />
      <Testimonials />
      <BlogPreview />
      <CtaBanner />
    </>
  )
}
