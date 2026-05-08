import { useEffect } from 'react'
import Seo, { breadcrumbJsonLd, SITE_URL } from '../components/Seo'
import Breadcrumbs from '../components/Breadcrumbs'
import LeadForm from '../components/LeadForm'

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const path = '/contacto'
  const jsonLd = [
    breadcrumbJsonLd([
      { name: 'Inicio', path: '/' },
      { name: 'Contacto', path }
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      url: `${SITE_URL}${path}`,
      name: 'Contacto · SEO Costa del Sol',
      mainEntity: { '@id': `${SITE_URL}/#business` }
    }
  ]

  return (
    <>
      <Seo
        title="Contacto · SEO Costa del Sol | Marcos Morales"
        description="Contacta con Marcos Morales para tu auditoría SEO gratis en la Costa del Sol. Email seo@marcosmorales.dev. Respuesta en menos de 48 horas."
        path={path}
        jsonLd={jsonLd}
      />
      <main style={{ background: '#080808', minHeight: '100vh', paddingTop: '5rem' }}>
        <div className="container">
          <Breadcrumbs items={[{ name: 'Inicio', path: '/' }, { name: 'Contacto' }]} />
        </div>
        <section style={{ padding: '3rem 0 1rem' }}>
          <div className="container">
            <span className="eyebrow">/ Contacto</span>
            <h1 style={{
              fontFamily: 'Space Grotesk, system-ui, sans-serif',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 600,
              letterSpacing: '-0.04em',
              lineHeight: 0.96,
              color: '#fff',
              margin: '0.8rem 0 1.5rem'
            }}>
              Hablemos.
            </h1>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '2rem',
              padding: '2rem 0',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              maxWidth: 900
            }}>
              <div>
                <span style={{
                  fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                  fontSize: '0.7rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.45)',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>Email</span>
                <a href="mailto:seo@marcosmorales.dev" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.1rem' }}>
                  seo@marcosmorales.dev
                </a>
              </div>
              <div>
                <span style={{
                  fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                  fontSize: '0.7rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.45)',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>Ubicación</span>
                <span style={{ color: '#fff', fontSize: '1.05rem' }}>
                  Torremolinos, Málaga · ES<br />
                  Costa del Sol
                </span>
              </div>
              <div>
                <span style={{
                  fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                  fontSize: '0.7rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.45)',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>Horario</span>
                <span style={{ color: '#fff', fontSize: '1.05rem' }}>
                  L-V · 09:00–19:00<br />
                  Respuesta &lt; 48h
                </span>
              </div>
            </div>
          </div>
        </section>
        <LeadForm />
      </main>
    </>
  )
}
