import { motion } from 'framer-motion'
import styles from './Hero.module.css'

const line1 = ['APARECER', 'EN', 'GOOGLE']
const line2 = ['ES', 'TU', 'MEJOR', 'VENDEDOR']

const wordVariant = {
  hidden: { y: '110%', opacity: 0, rotate: 4 },
  show: (i) => ({
    y: '0%',
    opacity: 1,
    rotate: 0,
    transition: {
      delay: 0.25 + i * 0.1,
      duration: 0.95,
      ease: [0.16, 1, 0.3, 1]
    }
  })
}

export default function Hero() {
  return (
    <section className={styles.hero} id="top" aria-label="Auditoría SEO gratis en la Costa del Sol">
      {/* Decorative backdrop SEO */}
      <div className={styles.backdrop} aria-hidden="true">
        <span>SEO</span>
      </div>

      {/* Gradient mesh */}
      <div className={styles.mesh} aria-hidden="true">
        <div className={styles.meshA} />
        <div className={styles.meshB} />
      </div>

      {/* Top meta strip */}
      <motion.div
        className={styles.meta}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8 }}
      >
        <div className={styles.metaLeft}>
          <span className={styles.metaPulse} />
          Marcos Morales · SEO Costa del Sol
        </div>
        <div className={styles.metaCenter}>
          <span>N° 001</span>
          <span className={styles.metaSep} />
          <span>Costa del Sol · Málaga</span>
        </div>
        <div className={styles.metaRight}>36.62°N — 04.50°W</div>
      </motion.div>

      <div className={`container ${styles.grid}`}>
        {/* Left column: small intro */}
        <motion.div
          className={styles.intro}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <span className={styles.eyebrow}>
            <i /> Disponible · Abril 2026
          </span>
          <p className={styles.lede}>
            Audito tu negocio en la Costa del Sol gratis — Málaga, Marbella, Fuengirola, Benalmádena, Torremolinos, Nerja.
            Te digo por qué tu competencia te gana en Google
            <span className={styles.ledeAccent}> y cómo cambiarlo en 30 días.</span>
          </p>
        </motion.div>

        {/* Headline */}
        <h1 className={styles.headline}>
          <span className={styles.lineOuter}>
            <span className={styles.line}>
              {line1.map((w, i) => (
                <span key={w + i} className={styles.wordWrap}>
                  <motion.span
                    className={styles.word}
                    variants={wordVariant}
                    custom={i}
                    initial="hidden"
                    animate="show"
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </span>
          </span>
          <span className={styles.lineOuter}>
            <span className={`${styles.line} ${styles.lineShift}`}>
              {line2.map((w, i) => (
                <span key={w + i} className={styles.wordWrap}>
                  <motion.span
                    className={`${styles.word} ${i === 2 ? styles.wordAccent : ''}`}
                    variants={wordVariant}
                    custom={i + line1.length}
                    initial="hidden"
                    animate="show"
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </span>
          </span>
        </h1>

        {/* CTA cluster */}
        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.55, duration: 0.8 }}
        >
          <a href="#contacto" className={styles.primary} data-cursor data-cursor-text="Empezar">
            <span className={styles.glow} aria-hidden="true" />
            <span className={styles.primaryLabel}>Quiero mi auditoría gratis</span>
            <span className={styles.primaryArrow}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12m0 0L8 2m5 5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
              </svg>
            </span>
          </a>

          <a href="#proceso" className={styles.secondary} data-cursor>
            <span className={styles.dot} />
            Ver cómo funciona
            <span className={styles.arrow}>→</span>
          </a>
        </motion.div>

        {/* Right column: rotating badge */}
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <motion.svg
            viewBox="0 0 200 200"
            className={styles.badgeRing}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}
          >
            <defs>
              <path
                id="circle-text"
                d="M 100, 100 m -82, 0 a 82,82 0 1,1 164,0 a 82,82 0 1,1 -164,0"
              />
            </defs>
            <text className={styles.badgeText}>
              <textPath href="#circle-text">
                SIN COMPROMISO · AUDITORÍA GRATUITA ·
              </textPath>
            </text>
          </motion.svg>
          <div className={styles.badgeCore}>
            <span className={styles.badgeKicker}>EST. 2018</span>
            <span className={styles.badgeBig}>SEO</span>
            <span className={styles.badgeKicker}>COSTA DEL SOL</span>
          </div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          className={styles.stats}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.8 }}
        >
          <div className={styles.stat}>
            <span className={styles.statNum}>47</span>
            <span className={styles.statLabel}>Negocios locales auditados</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>30<i>días</i></span>
            <span className={styles.statLabel}>Para empezar a posicionar</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>0<i>€</i></span>
            <span className={styles.statLabel}>Coste de la auditoría inicial</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className={styles.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.8 }}
      >
        <span>Desplázate</span>
        <motion.span
          className={styles.scrollLine}
          animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
