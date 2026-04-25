import { motion } from 'framer-motion'
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
            <p className={styles.text}>
              Marcos Morales <br />
              Costa del Sol · Torremolinos, Málaga · ES
            </p>
          </div>

          <div className={styles.col}>
            <span className={styles.kicker}>Contacto</span>
            <a href="mailto:seo@marcosmorales.dev" className={styles.linkBig}>
              seo@marcosmorales.dev
            </a>
          </div>

          <div className={styles.col}>
            <span className={styles.kicker}>Sígueme</span>
            <div className={styles.social}>
              <a href="#" aria-label="LinkedIn" className={styles.socialLink}>LinkedIn</a>
              <a href="#" aria-label="X / Twitter" className={styles.socialLink}>X</a>
              <a href="#" aria-label="Email" className={styles.socialLink}>Email</a>
            </div>
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
