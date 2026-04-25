import { motion } from 'framer-motion'
import styles from './Ticker.module.css'

const ITEMS = [
  'Auditoría 100% gratuita',
  'Sin compromiso',
  'Respuesta en 48 horas',
  'Especializado en Costa del Sol',
  'Informe detallado',
  'Plan de acción claro',
  'Sin contratos largos'
]

const Star = () => (
  <svg className={styles.star} width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 1.5l2.4 7.4h7.8l-6.3 4.6 2.4 7.4-6.3-4.6-6.3 4.6 2.4-7.4-6.3-4.6h7.8z"
      fill="currentColor"
    />
  </svg>
)

export default function Ticker() {
  const row = [...ITEMS, ...ITEMS]

  return (
    <section className={styles.section} aria-label="Garantías del servicio">
      <div className={styles.tick}>
        <motion.div
          className={styles.track}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
        >
          {row.map((it, i) => (
            <div className={styles.item} key={i}>
              <Star />
              <span>{it}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
