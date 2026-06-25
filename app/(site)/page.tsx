import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import ServicesOverview from '@/components/home/ServicesOverview'
import BrandStrip from '@/components/home/BrandStrip'
import WhyUs from '@/components/home/WhyUs'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import Testimonials from '@/components/home/Testimonials'
import BlogPreview from '@/components/home/BlogPreview'
import CtaBanner from '@/components/home/CtaBanner'

export const metadata: Metadata = {
  title: '2AC GROUPE — BTP, Logistique, Commerce & Ingénierie à Conakry',
  description:
    "2AC GROUPE : groupe guinéen multisectoriel réunissant cinq pôles — BTP & construction, commerce de matériaux (PLANÈTE), transport & logistique (2AC TRANSIT), nettoyage & assainissement (CleanTech) et ingénierie ferroviaire & énergie (Ferrorail). Basé à Lambanyi, Conakry.",
}

// Revalidation ISR : les modifications faites dans Supabase apparaissent
// au plus tard après 60 secondes, sans redéploiement.
export const revalidate = 60

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <BrandStrip />
      <WhyUs />
      <FeaturedProjects />
      <Testimonials />
      <BlogPreview />
      <CtaBanner />
    </>
  )
}
