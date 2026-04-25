import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import styles from './Services.module.css'

const services = [
  {
    n: '01',
    title: 'Auditoría técnica completa',
    body: 'Velocidad, errores, estructura, etiquetas, indexación. Reviso todo lo que ralentiza tu web sin que te des cuenta y te explico, sin tecnicismos, qué hay que tocar primero.',
    bullets: ['Velocidad de carga', 'Errores de rastreo', 'Estructura interna', 'Datos enriquecidos']
  },
  {
    n: '02',
    title: 'Análisis de keywords y competencia',
    body: 'Investigo qué buscan exactamente tus clientes en la Costa del Sol — Málaga, Marbella, Fuengirola — y cómo lo hacen. Te enseño qué páginas de la competencia se llevan ese tráfico y por qué.',
    bullets: ['Búsquedas reales', 'Volumen e intención', 'Top 10 competidores', 'Huecos por aprovechar']
  },
  {
    n: '03',
    title: 'Plan de acción priorizado',
    body: 'Te entrego una hoja de ruta clara: qué arreglar primero, qué contenido crear, qué enlaces conseguir. Ordenado por impacto, no por capricho.',
    bullets: ['Quick wins en 7 días', 'Roadmap a 90 días', 'Contenidos sugeridos', 'KPIs medibles']
  }
]

function ServiceCard({ s, i }) {
  const cardRef = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  const rotateY = useTransform(mx, [0, 1], [-7, 7])
  const rotateX = useTransform(my, [0, 1], [6, -6])

  const sRotX = useSpring(rotateX, { stiffness: 220, damping: 20 })
  const sRotY = useSpring(rotateY, { stiffness: 220, damping: 20 })

  const glareX = useTransform(mx, [0, 1], ['-10%', '110%'])
  const glareY = useTransform(my, [0, 1], ['-10%', '110%'])

  const onMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }

  const onLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={styles.card}
      style={{ rotateX: sRotX, rotateY: sRotY, transformPerspective: 1100 }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ delay: i * 0.08, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      data-cursor
    >
      <motion.div
        className={styles.glare}
        style={{
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]) =>
              `radial-gradient(420px circle at ${gx} ${gy}, rgba(190,255,0,0.10), transparent 60%)`
          )
        }}
      />
      <div className={styles.cardInner}>
        <div className={styles.headRow}>
          <span className={styles.num}>{s.n}</span>
          <span className={styles.bar} />
          <span className={styles.kicker}>Servicio</span>
        </div>

        <h3 className={styles.cardTitle}>{s.title}</h3>
        <p className={styles.cardBody}>{s.body}</p>

        <ul className={styles.bullets}>
          {s.bullets.map((b) => (
            <li key={b}>
              <span className={styles.bulletDot} />
              {b}
            </li>
          ))}
        </ul>

        <div className={styles.foot}>
          <span>Incluido en la auditoría</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
          </svg>
        </div>
      </div>
    </motion.article>
  )
}

export default function Services() {
  return (
    <section className={styles.section} id="servicio" aria-label="Lo que hago por tu negocio">
      <div className={`container ${styles.container}`}>
        <motion.div
          className={styles.head}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">/ Servicio · 002</span>
          <h2 className={styles.title}>
            Lo que hago <br />
            por tu <span className={styles.titleAccent}>negocio</span>
            <span className={styles.titleAst}>*</span>
          </h2>
          <p className={styles.note}>
            <span className={styles.noteAst}>*</span> Sin agencia, sin departamentos.
            Soy yo quien audita, escribe y entrega. Tres servicios que se trabajan juntos
            y nunca por separado.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {services.map((s, i) => (
            <ServiceCard key={s.n} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
