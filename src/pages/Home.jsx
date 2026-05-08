import Seo, { breadcrumbJsonLd, faqJsonLd } from '../components/Seo'
import Hero from '../components/Hero'
import Ticker from '../components/Ticker'
import Problem from '../components/Problem'
import Services from '../components/Services'
import Process from '../components/Process'
import Sectors from '../components/Sectors'
import FAQ from '../components/FAQ'
import LeadForm from '../components/LeadForm'
import { generalFaqs } from '../data/faqs'

export default function Home() {
  const homeFaqs = generalFaqs.slice(0, 6)
  const jsonLd = [
    breadcrumbJsonLd([{ name: 'Inicio', path: '/' }]),
    faqJsonLd(homeFaqs)
  ]

  return (
    <>
      <Seo
        title="SEO Costa del Sol | Auditoría SEO Gratis Málaga, Marbella, Fuengirola"
        description="SEO Costa del Sol: auditoría gratuita y sin compromiso para negocios locales en Málaga, Marbella, Fuengirola, Benalmádena, Torremolinos y Nerja. Te digo exactamente por qué no apareces en Google y cómo posicionarte en 30 días."
        path="/"
        jsonLd={jsonLd}
      />
      <main>
        <Hero />
        <Ticker />
        <Problem />
        <Services />
        <Process />
        <Sectors />
        <FAQ faqs={homeFaqs} />
        <LeadForm />
      </main>
    </>
  )
}
