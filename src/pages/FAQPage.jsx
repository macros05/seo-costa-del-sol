import { useEffect } from 'react'
import Seo, { breadcrumbJsonLd, faqJsonLd } from '../components/Seo'
import Breadcrumbs from '../components/Breadcrumbs'
import FAQ from '../components/FAQ'
import LeadForm from '../components/LeadForm'
import { generalFaqs } from '../data/faqs'

export default function FAQPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const path = '/preguntas-frecuentes'
  const jsonLd = [
    breadcrumbJsonLd([
      { name: 'Inicio', path: '/' },
      { name: 'Preguntas frecuentes', path }
    ]),
    faqJsonLd(generalFaqs)
  ]

  return (
    <>
      <Seo
        title="Preguntas frecuentes sobre SEO en la Costa del Sol | Marcos Morales"
        description="Resuelvo las dudas más habituales: precios, plazos, garantías, sectores, ciudades. Todo lo que un dueño de negocio quiere saber antes de contratar SEO en Málaga."
        path={path}
        jsonLd={jsonLd}
      />
      <main style={{ background: '#080808', minHeight: '100vh', paddingTop: '5rem' }}>
        <div className="container">
          <Breadcrumbs
            items={[{ name: 'Inicio', path: '/' }, { name: 'Preguntas frecuentes' }]}
          />
        </div>
        <FAQ
          faqs={generalFaqs}
          eyebrow="/ FAQ · Costa del Sol"
        />
        <LeadForm />
      </main>
    </>
  )
}
