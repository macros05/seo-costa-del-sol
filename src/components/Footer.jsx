import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer} aria-label="Pie de página">
      <div className={styles.giant} aria-hidden="true">
        <span>MARCOS</span>
        <span className={styles.giantAccent}>MORALES</span>
      </div>

      <div className={`container ${styles.container}`}>
        <div className={styles.row}>
          <div className={styles.col}>
            <span className={styles.kicker}>Estudio</span>
            <p className={styles.text} itemScope itemType="https://schema.org/PostalAddress">
              <span itemProp="streetAddress">Marcos Morales</span> <br />
              <span itemProp="addressLocality">Torremolinos</span>,{' '}
              <span itemProp="addressRegion">Málaga</span> ·{' '}
              <span itemProp="addressCountry">ES</span>
            </p>
          </div>

          <div className={styles.col}>
            <span className={styles.kicker}>Contacto</span>
            <a href="mailto:seo@marcosmorales.dev" className={styles.linkBig}>
              seo@marcosmorales.dev
            </a>
            <Link to="/contacto" className={styles.subLink}>
              Página de contacto →
            </Link>
          </div>

          <div className={styles.col}>
            <span className={styles.kicker}>Áreas</span>
            <ul className={styles.list}>
              <li><Link to="/seo-malaga">SEO Málaga</Link></li>
              <li><Link to="/seo-marbella">SEO Marbella</Link></li>
              <li><Link to="/seo-fuengirola">SEO Fuengirola</Link></li>
              <li><Link to="/seo-benalmadena">SEO Benalmádena</Link></li>
              <li><Link to="/seo-torremolinos">SEO Torremolinos</Link></li>
              <li><Link to="/seo-estepona">SEO Estepona</Link></li>
              <li><Link to="/seo-mijas">SEO Mijas</Link></li>
              <li><Link to="/seo-nerja">SEO Nerja</Link></li>
              <li><Link to="/seo-rincon-de-la-victoria">SEO Rincón de la Victoria</Link></li>
              <li><Link to="/seo-velez-malaga">SEO Vélez-Málaga</Link></li>
            </ul>
          </div>

          <div className={styles.col}>
            <span className={styles.kicker}>Servicios</span>
            <ul className={styles.list}>
              <li><Link to="/servicios/auditoria-seo">Auditoría SEO</Link></li>
              <li><Link to="/servicios/seo-local">SEO local</Link></li>
              <li><Link to="/servicios/seo-ecommerce">SEO ecommerce</Link></li>
              <li><Link to="/servicios/link-building">Link building</Link></li>
              <li><Link to="/precios">Precios y tarifas</Link></li>
              <li><Link to="/sobre">Sobre Marcos</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/preguntas-frecuentes">Preguntas frecuentes</Link></li>
            </ul>
          </div>

          <motion.div
            className={styles.col}
            whileHover={{ scale: 1.02 }}
          >
            <span className={styles.kicker}>Disponibilidad</span>
            <p className={styles.text}>
              <span className={styles.dotPulse} />
              Aceptando 2 proyectos en {year}
            </p>
          </motion.div>
        </div>

        <div className={styles.bottom}>
          <span>© {year} Marcos Morales · seocostadelsol.com</span>
          <span>Hecho con café en Torremolinos · Costa del Sol</span>
          <a href="#top" className={styles.toTop}>
            Volver arriba
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 11V1m0 0L1 6m5-5l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
