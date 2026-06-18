import { Star, Quote } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { getTestimonials } from '@/lib/content'

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Note : ${rating} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'fill-accent-DEFAULT text-accent' : 'text-slate-200'}`}
          aria-hidden
        />
      ))}
    </div>
  )
}

export default async function Testimonials() {
  const testimonials = await getTestimonials()
  return (
    <section className="section-padding bg-primary" aria-labelledby="testimonials-heading">
      <div className="container-base">
        <SectionHeader
          eyebrow="Témoignages"
          title="Ce que disent nos clients"
          description="La satisfaction de nos clients est notre meilleure carte de visite."
          light
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.author_name} delay={i * 100}>
              <blockquote className="card-base flex h-full flex-col p-6">
                <Quote className="mb-3 h-8 w-8 text-accent/40" aria-hidden />
                <p className="flex-1 text-sm leading-relaxed text-slate-700">"{t.content}"</p>
                <footer className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full gradient-primary text-sm font-bold text-white">
                    {t.author_name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">{t.author_name}</p>
                    {t.company && <p className="truncate text-xs text-slate-500">{t.company}</p>}
                  </div>
                  <div className="ml-auto shrink-0">
                    {t.rating && <Stars rating={t.rating} />}
                  </div>
                </footer>
              </blockquote>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
