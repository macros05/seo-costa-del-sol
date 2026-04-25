import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import styles from './Process.module.css'

const steps = [
  {
    n: '01',
    title: 'Solicitas la auditoría',
    meta: '2 minutos · Gratis',
    body: 'Rellenas un formulario corto con tu web y tu sector. Sin llamadas comerciales, sin pedirte que firmes nada. Solo necesito entender qué haces.'
  },
  {
    n: '02',
    title: 'Analizo tu web en 48 horas',
    meta: 'A mano · Sin software genérico',
    body: 'Reviso tu sitio personalmente: rastreo técnico, contenidos, comparativa con competencia local en la Costa del Sol y huecos por explotar.'
  },
  {
    n: '03',
    title: 'Recibes tu plan de acción',
    meta: 'PDF + reunión opcional',
    body: 'Te llega un informe claro con qué arreglar primero, qué impacto esperar y un calendario realista. Tú decides si lo implementas tú o trabajamos juntos.'
  }
]

export default function Process() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-25% 0px' })

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="proceso"
      aria-label="Cómo funciona el proceso"
    >
      <div className={`container ${styles.container}`}>
        <motion.div
          className={styles.head}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">/ Proceso · 003</span>
          <h2 className={styles.title}>
            Tres pasos. <br />
            <span className={styles.titleAccent}>Cero fricción.</span>
          </h2>
          <p className={styles.note}>
            Diseñado para dueños de negocio que no tienen tiempo. Tú me das tu
            web, yo te doy un plan claro.
          </p>
        </motion.div>

        <div className={styles.steps}>
          {/* Connector line — desktop */}
          <svg
            className={styles.connector}
            viewBox="0 0 1200 4"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.path
              d="M 0 2 L 1200 2"
              stroke="var(--lime)"
              strokeWidth="1.5"
              strokeDasharray="6 8"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>

          {/* Connector line — mobile (vertical) */}
          <svg
            className={styles.connectorV}
            viewBox="0 0 4 1200"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.path
              d="M 2 0 L 2 1200"
              stroke="var(--lime)"
              strokeWidth="1.5"
              strokeDasharray="6 8"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>

          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              className={styles.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.dotWrap}>
                <span className={styles.dotOuter} />
                <span className={styles.dotInner} />
              </div>

              <div className={styles.stepCard}>
                <div className={styles.stepHead}>
                  <span className={styles.stepNum}>{s.n}</span>
                  <span className={styles.stepMeta}>{s.meta}</span>
                </div>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepBody}>{s.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
