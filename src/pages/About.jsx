import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Seo, { breadcrumbJsonLd } from '../components/Seo'
import Breadcrumbs from '../components/Breadcrumbs'
import LeadForm from '../components/LeadForm'
import styles from './About.module.css'

const SITE_URL = 'https://seocostadelsol.com'

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Marcos Morales',
  alternateName: 'Marcos Morales González',
  url: `${SITE_URL}/sobre`,
  image: `${SITE_URL}/og-image.jpg`,
  jobTitle: 'Consultor SEO freelance',
  description:
    'Consultor SEO freelance especializado en posicionamiento web local para negocios de la Costa del Sol. Base de operaciones en Torremolinos. Más de 6 años trabajando SEO técnico, contenido y enlazado local para autónomos y pymes de Málaga y provincia.',
  knowsAbout: [
    'SEO local',
    'SEO técnico',
    'Google My Business',
    'Schema.org / datos estructurados',
    'Search Console',
    'Análisis de keywords',
    'Link building local',
    'SEO ecommerce',
    'Core Web Vitals',
    'Migraciones SEO',
    'Posicionamiento web local Costa del Sol'
  ],
  areaServed: [
    { '@type': 'Place', name: 'Costa del Sol' },
    { '@type': 'Place', name: 'Provincia de Málaga' }
  ],
  worksFor: { '@id': `${SITE_URL}/#business` },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Torremolinos',
    addressRegion: 'Málaga',
    addressCountry: 'ES'
  },
  email: 'mailto:seo@marcosmorales.dev',
  sameAs: ['https://www.linkedin.com/in/marcosmoralesgonzalez/']
}

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const path = '/sobre'
  const title = 'Sobre Marcos Morales | Consultor SEO freelance en la Costa del Sol'
  const description =
    'Marcos Morales · consultor SEO freelance con base en Torremolinos. 6+ años especializado en posicionamiento web local para negocios de Málaga y la Costa del Sol. Sin agencia, sin practicantes: el trabajo lo hago yo.'

  const jsonLd = [
    breadcrumbJsonLd([
      { name: 'Inicio', path: '/' },
      { name: 'Sobre Marcos', path }
    ]),
    personSchema
  ]

  return (
    <>
      <Seo title={title} description={description} path={path} jsonLd={jsonLd} />
      <main className={styles.page}>
        <div className="container">
          <Breadcrumbs
            items={[
              { name: 'Inicio', path: '/' },
              { name: 'Sobre Marcos' }
            ]}
          />
        </div>

        <header className={styles.hero}>
          <div className="container">
            <span className="eyebrow">Quién está detrás · Costa del Sol</span>
            <motion.h1
              className={styles.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Marcos Morales.
              <br />
              <span className={styles.titleAccent}>Consultor SEO freelance.</span>
            </motion.h1>
            <p className={styles.lede}>
              Trabajo SEO local para negocios de la Costa del Sol desde Torremolinos.
              Sin agencia, sin equipo subcontratado, sin practicantes que aprenden con tu cuenta.
              Lo hago yo, de principio a fin, y por eso solo acepto 2 proyectos nuevos al año.
            </p>
          </div>
        </header>

        <section className={styles.block}>
          <div className="container">
            <div className={styles.twoCol}>
              <div>
                <h2 className={styles.h2}>Cómo trabajo</h2>
                <p>
                  Empecé en SEO en 2018 y desde 2022 trabajo exclusivamente con negocios
                  locales de Málaga y la Costa del Sol. Mi modelo es deliberadamente pequeño:
                  cupo cerrado, contacto directo conmigo (no con un account manager), y honestidad
                  brutal sobre lo que se puede y no se puede conseguir.
                </p>
                <p>
                  No vendo paquetes prefabricados. Cada proyecto empieza con una auditoría
                  gratuita en la que veo tu situación real — técnica, contenidos, competencia —
                  y propongo un plan con prioridades y plazos realistas. Si lo que necesitas no
                  encaja con mi forma de trabajar, te lo digo y te derivo a un colega que sí encaje.
                </p>
                <p>
                  Cuando trabajamos, recibes un email mensual con lo que se hizo, lo que están
                  midiendo Search Console y Analytics, y lo que viene el mes siguiente. Sin
                  dashboards inflados ni jerga que no significa nada.
                </p>
              </div>
              <aside className={styles.factsCard}>
                <h3 className={styles.factsTitle}>Hechos rápidos</h3>
                <dl className={styles.facts}>
                  <div>
                    <dt>Base</dt>
                    <dd>Torremolinos, Málaga</dd>
                  </div>
                  <div>
                    <dt>Desde</dt>
                    <dd>2018 · 8 años en SEO</dd>
                  </div>
                  <div>
                    <dt>Especialidad</dt>
                    <dd>SEO local Costa del Sol</dd>
                  </div>
                  <div>
                    <dt>Cupo</dt>
                    <dd>2 proyectos nuevos / año</dd>
                  </div>
                  <div>
                    <dt>Modelo</dt>
                    <dd>Freelance · sin permanencia</dd>
                  </div>
                  <div>
                    <dt>Idiomas</dt>
                    <dd>Español · Inglés</dd>
                  </div>
                </dl>
              </aside>
            </div>
          </div>
        </section>

        <section className={styles.block}>
          <div className="container">
            <h2 className={styles.h2}>En qué soy útil</h2>
            <ul className={styles.skills}>
              <li>
                <span className={styles.skillTitle}>SEO local Costa del Sol</span>
                <span className={styles.skillDesc}>
                  Google My Business, citaciones NAP, schema LocalBusiness, contenido geo-targeted
                  por barrio. La columna vertebral de cualquier negocio con sede física.
                </span>
              </li>
              <li>
                <span className={styles.skillTitle}>SEO técnico</span>
                <span className={styles.skillDesc}>
                  Indexación, crawl budget, Core Web Vitals, migraciones, log analysis,
                  schema avanzado. Lo invisible que decide si Google te ve o no.
                </span>
              </li>
              <li>
                <span className={styles.skillTitle}>Contenido y keywords</span>
                <span className={styles.skillDesc}>
                  Investigación de intención de búsqueda, content briefs, calendario editorial,
                  enlazado interno. Contenido que vende, no que rellena.
                </span>
              </li>
              <li>
                <span className={styles.skillTitle}>SEO ecommerce</span>
                <span className={styles.skillDesc}>
                  Arquitectura de categorías, fichas optimizadas, schema Product, recuperación
                  de productos zombi. Para tiendas con sede en Málaga.
                </span>
              </li>
              <li>
                <span className={styles.skillTitle}>Link building local</span>
                <span className={styles.skillDesc}>
                  Citaciones legítimas en directorios y medios locales. Sin compra de enlaces
                  baratos que penalizan a medio plazo.
                </span>
              </li>
              <li>
                <span className={styles.skillTitle}>Search Console + Analytics</span>
                <span className={styles.skillDesc}>
                  Configuración limpia desde cero, dashboards útiles, atribución de leads
                  orgánicos. Lo que no se mide no existe.
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section className={styles.block}>
          <div className="container">
            <h2 className={styles.h2}>Lo que NO hago</h2>
            <ul className={styles.skills}>
              <li>
                <span className={styles.skillTitle}>SEO black-hat</span>
                <span className={styles.skillDesc}>
                  Nada de PBNs comprados, scraping de contenido, enlaces de mala calidad
                  ni atajos que tarde o temprano traen penalización manual.
                </span>
              </li>
              <li>
                <span className={styles.skillTitle}>Garantías de posición</span>
                <span className={styles.skillDesc}>
                  Nadie controla el algoritmo de Google. Garantizo proceso, transparencia y
                  resultados medibles — no posiciones concretas.
                </span>
              </li>
              <li>
                <span className={styles.skillTitle}>Proyectos fuera de Málaga</span>
                <span className={styles.skillDesc}>
                  Mi valor es conocer la Costa del Sol al detalle: competencia, sectores,
                  comportamiento del cliente local. Para SEO en Madrid o internacional, no soy yo.
                </span>
              </li>
              <li>
                <span className={styles.skillTitle}>SaaS internacionales o catálogos de 50K SKUs</span>
                <span className={styles.skillDesc}>
                  Trabajo bien con autónomos, pymes y tiendas online de tamaño medio. Para
                  proyectos enterprise con equipos in-house, mi modelo no encaja.
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section className={styles.block}>
          <div className="container">
            <h2 className={styles.h2}>Próximos pasos</h2>
            <div className={styles.ctas}>
              <Link to="/contacto" className={styles.ctaPrimary} data-cursor>
                Quiero mi auditoría gratis →
              </Link>
              <Link to="/precios" className={styles.ctaSecondary} data-cursor>
                Ver precios y tarifas
              </Link>
              <Link to="/blog" className={styles.ctaSecondary} data-cursor>
                Leer el blog
              </Link>
            </div>
          </div>
        </section>

        <LeadForm />
      </main>
    </>
  )
}
