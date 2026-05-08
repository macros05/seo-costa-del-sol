import { useEffect } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Seo, { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from '../components/Seo'
import Breadcrumbs from '../components/Breadcrumbs'
import FAQ from '../components/FAQ'
import LeadForm from '../components/LeadForm'
import { getService, services } from '../data/services'
import styles from './ServicePage.module.css'

export default function ServicePage() {
  const { slug } = useParams()
  const service = getService(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!service) return <Navigate to="/" replace />

  const path = `/servicios/${service.slug}`
  const jsonLd = [
    breadcrumbJsonLd([
      { name: 'Inicio', path: '/' },
      { name: 'Servicios', path: '/' },
      { name: service.name, path }
    ]),
    serviceJsonLd({
      name: service.name,
      description: service.description,
      slug: path
    }),
    faqJsonLd(service.faqs)
  ]

  return (
    <>
      <Seo
        title={service.title}
        description={service.description}
        path={path}
        jsonLd={jsonLd}
      />
      <main className={styles.page}>
        <div className="container">
          <Breadcrumbs
            items={[
              { name: 'Inicio', path: '/' },
              { name: 'Servicios' },
              { name: service.name }
            ]}
          />
        </div>

        <header className={styles.hero}>
          <div className="container">
            <span className="eyebrow">Servicio · {service.slug.toUpperCase()}</span>
            <motion.h1
              className={styles.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {service.name}.
              <br />
              <span className={styles.titleAccent}>Sin paja.</span>
            </motion.h1>
            <p className={styles.lede}>{service.summary}</p>
          </div>
        </header>

        <section className={styles.block}>
          <div className="container">
            <h2 className={styles.h2}>Qué te llevas si trabajamos {service.name.toLowerCase()}</h2>
            <ul className={styles.deliverables}>
              {service.deliverables.map((d, i) => (
                <li key={i}>
                  <span className={styles.delN}>{String(i + 1).padStart(2, '0')}</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.block}>
          <div className="container">
            <div className={styles.facts}>
              <div>
                <span className={styles.factLabel}>Plazo realista</span>
                <span className={styles.factValue}>{service.duration}</span>
              </div>
              <div>
                <span className={styles.factLabel}>Inversión</span>
                <span className={styles.factValue}>{service.price}</span>
              </div>
              <div>
                <span className={styles.factLabel}>Auditoría inicial</span>
                <span className={styles.factValue}>Gratis · 48h</span>
              </div>
            </div>
          </div>
        </section>

        <FAQ
          faqs={service.faqs}
          eyebrow="/ Dudas frecuentes"
          title={
            <>
              Lo que <em>siempre</em>
              <br /> me preguntan sobre <span className={styles.faqAccent}>{service.name.toLowerCase()}</span>.
            </>
          }
        />

        <section className={styles.block}>
          <div className="container">
            <h2 className={styles.h2}>Otros servicios</h2>
            <div className={styles.others}>
              {services
                .filter((s) => s.slug !== service.slug)
                .map((s) => (
                  <Link
                    key={s.slug}
                    to={`/servicios/${s.slug}`}
                    className={styles.otherCard}
                    data-cursor
                  >
                    <span className={styles.otherTitle}>{s.name}</span>
                    <span className={styles.otherDesc}>{s.summary.slice(0, 100)}…</span>
                    <span className={styles.otherArrow}>Ver →</span>
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
