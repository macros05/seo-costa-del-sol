import { motion } from 'framer-motion'
import styles from './Sectors.module.css'

const sectors = [
  { name: 'Restaurantes', icon: '◗' },
  { name: 'Clínicas', icon: '✚' },
  { name: 'Talleres', icon: '◑' },
  { name: 'Despachos', icon: '◧' },
  { name: 'Gimnasios', icon: '◐' },
  { name: 'Tiendas', icon: '◇' },
  { name: 'Hoteles', icon: '◍' },
  { name: 'Academias', icon: '◉' }
]

export default function Sectors() {
  return (
    <section className={styles.section} id="sectores" aria-label="Sectores con los que trabajo">
      <div className={`container ${styles.container}`}>
        <motion.div
          className={styles.head}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">/ Sectores · 004</span>
          <h2 className={styles.title}>
            Para negocios <br />
            <em>como</em> el <span className={styles.titleAccent}>tuyo.</span>
          </h2>
          <p className={styles.note}>
            Trabajo con negocios locales en toda la Costa del Sol — Málaga, Marbella,
            Fuengirola, Benalmádena, Torremolinos, Nerja y Estepona.
            Si lo tuyo no aparece en la lista, escríbeme igualmente.
          </p>
        </motion.div>

        <div className={styles.cloud}>
          {sectors.map((s, i) => (
            <motion.span
              key={s.name}
              className={styles.pill}
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{
                delay: i * 0.05,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1]
              }}
              data-cursor
            >
              <span className={styles.pillIcon} aria-hidden="true">{s.icon}</span>
              <span className={styles.pillLabel}>{s.name}</span>
            </motion.span>
          ))}
        </div>

        <div className={styles.line} />

        <div className={styles.bottom}>
          <p className={styles.bottomLeft}>
            <span className={styles.bigQuote}>“</span>
            Cada sector tiene sus propias búsquedas, su propia competencia y sus
            propias oportunidades. <span className={styles.bottomAccent}>No vale la misma fórmula para todos.</span>
            <span className={styles.bigQuoteClose}>”</span>
          </p>
          <div className={styles.bottomRight}>
            <div className={styles.signature}>
              <span className={styles.sigName}>M. Morales</span>
              <span className={styles.sigRole}>SEO freelance · Costa del Sol</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
