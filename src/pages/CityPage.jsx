import { useEffect } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Seo, { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from '../components/Seo'
import Breadcrumbs from '../components/Breadcrumbs'
import LeadForm from '../components/LeadForm'
import { getCity, cities } from '../data/cities'
import { generalFaqs } from '../data/faqs'
import styles from './CityPage.module.css'

export default function CityPage() {
  const { slug } = useParams()
  const fullSlug = slug ? `seo-${slug}` : null
  const city = getCity(fullSlug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [fullSlug])

  if (!city) return <Navigate to="/" replace />

  const path = `/${city.slug}`
  const title = `${city.name} | Consultor SEO en ${city.city} · Marcos Morales`
  const description = `Consultor SEO en ${city.city}: auditoría gratis, posicionamiento web local y SEO en Google Maps para negocios de ${city.city} y la Costa del Sol. Plan de acción en 48 horas.`

  const cityFaqs = [
    {
      q: `¿Por qué hace falta un SEO específico para ${city.city}?`,
      a: `Porque las búsquedas en ${city.city} son distintas a las de Madrid o Barcelona: long-tails locales, competencia geográfica concreta y comportamiento de cliente que un SEO genérico no entiende. Trabajar SEO local en ${city.city} es trabajar el barrio, no la nación.`
    },
    {
      q: `¿Cuánto tarda en posicionar mi negocio en ${city.city}?`,
      a: `Depende del punto de partida y el sector, pero la media para negocios locales en ${city.city} es: primeros movimientos a partir del mes 2, top 3 estable entre el mes 4 y el 8.`
    },
    ...generalFaqs.slice(0, 4)
  ]

  const jsonLd = [
    breadcrumbJsonLd([
      { name: 'Inicio', path: '/' },
      { name: 'Servicios', path: '/' },
      { name: city.name, path }
    ]),
    serviceJsonLd({
      name: city.name,
      description,
      slug: path,
      areaServed: city.city
    }),
    faqJsonLd(cityFaqs),
    {
      '@context': 'https://schema.org',
      '@type': 'Place',
      name: city.city,
      address: {
        '@type': 'PostalAddress',
        addressLocality: city.city,
        addressRegion: 'Málaga',
        addressCountry: 'ES'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: city.coords.lat,
        longitude: city.coords.lng
      }
    }
  ]

  return (
    <>
      <Seo title={title} description={description} path={path} jsonLd={jsonLd} />
      <main className={styles.page}>
        <div className="container">
          <Breadcrumbs
            items={[
              { name: 'Inicio', path: '/' },
              { name: 'Áreas de servicio', path: '/' },
              { name: city.name }
            ]}
          />
        </div>

        <header className={styles.hero}>
          <div className="container">
            <span className="eyebrow">Área de servicio · {city.city}</span>
            <motion.h1
              className={styles.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {city.name}.
              <br />
              <span className={styles.titleAccent}>Posicionamiento web local.</span>
            </motion.h1>
            <p className={styles.lede}>
              {city.intro}
            </p>
            <div className={styles.metaRow}>
              <div>
                <span className={styles.metaLabel}>Población</span>
                <span className={styles.metaValue}>{city.population}</span>
              </div>
              <div>
                <span className={styles.metaLabel}>Coordenadas</span>
                <span className={styles.metaValue}>
                  {city.coords.lat.toFixed(2)}°N · {Math.abs(city.coords.lng).toFixed(2)}°W
                </span>
              </div>
              <div>
                <span className={styles.metaLabel}>Auditoría inicial</span>
                <span className={styles.metaValue}>Gratis · 48h</span>
              </div>
            </div>
          </div>
        </header>

        <section className={styles.block}>
          <div className="container">
            <h2 className={styles.h2}>Cómo es el mercado SEO en {city.city}</h2>
            <p>{city.competitionNote}</p>
            <h3 className={styles.h3}>Sectores que más demandan SEO en {city.city}</h3>
            <ul className={styles.bullets}>
              {city.sectors.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.block}>
          <div className="container">
            <h2 className={styles.h2}>Qué incluye el SEO local en {city.city}</h2>
            <ol className={styles.steps}>
              <li>
                <strong>Auditoría técnica:</strong> velocidad, indexación, errores que están bloqueando que Google te muestre.
              </li>
              <li>
                <strong>Optimización de Google My Business:</strong> categorías correctas, atributos, fotos, descripción optimizada para búsquedas en {city.city}.
              </li>
              <li>
                <strong>Schema LocalBusiness:</strong> datos estructurados que Google necesita para mostrarte en el pack local.
              </li>
              <li>
                <strong>Contenido geo-targeted:</strong> páginas específicas por barrio cuando aplica (ej. La Carihuela en Torremolinos, Los Boliches en Fuengirola).
              </li>
              <li>
                <strong>Citaciones NAP:</strong> alta en directorios locales con nombre/dirección/teléfono consistentes.
              </li>
              <li>
                <strong>Estrategia de reseñas:</strong> sistema automático para conseguir 1-2 reseñas reales por semana en GMB.
              </li>
              <li>
                <strong>Seguimiento mensual:</strong> posiciones en pack local, evolución de impresiones en Search Console, llamadas y formularios.
              </li>
            </ol>
          </div>
        </section>

        <section className={styles.block}>
          <div className="container">
            <h2 className={styles.h2}>Otras zonas de la Costa del Sol</h2>
            <div className={styles.nearGrid}>
              {cities
                .filter((c) => c.slug !== city.slug)
                .map((c) => (
                  <Link key={c.slug} to={`/${c.slug}`} className={styles.nearCard} data-cursor>
                    <span className={styles.nearArrow}>→</span>
                    <span className={styles.nearTitle}>SEO en {c.city}</span>
                    <span className={styles.nearMeta}>{c.population.split(' ')[0]} hab.</span>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        <LeadForm />
      </main>
    </>
  )
}
