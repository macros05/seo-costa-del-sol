import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './FAQ.module.css'

export default function FAQ({ faqs, eyebrow = '/ Preguntas · 006', title }) {
  const [open, setOpen] = useState(0)

  return (
    <section className={styles.section} id="faq" aria-label="Preguntas frecuentes">
      <div className={`container ${styles.container}`}>
        <motion.div
          className={styles.head}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">{eyebrow}</span>
          <h2 className={styles.title}>
            {title || (
              <>
                Lo que <em>siempre</em>
                <br /> me <span className={styles.titleAccent}>preguntan.</span>
              </>
            )}
          </h2>
        </motion.div>

        <ul className={styles.list}>
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <li key={i} className={`${styles.item} ${isOpen ? styles.open : ''}`}>
                <button
                  type="button"
                  className={styles.question}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  data-cursor
                >
                  <span className={styles.qNum}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.qText}>{f.q}</span>
                  <span className={styles.qIcon} aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className={styles.answerWrap}
                    >
                      <p className={styles.answer}>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
