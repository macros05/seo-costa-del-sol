import { motion } from 'framer-motion'
import styles from './Problem.module.css'

const cards = [
  {
    n: '01',
    title: 'Tu competencia aparece antes que tú',
    body: 'Los primeros tres resultados de Google se quedan con el 70% de los clics. Si no estás ahí, prácticamente no existes para alguien que busca tu servicio en la Costa del Sol ahora mismo.',
    span: 'large',
    tag: 'Visibilidad cero'
  },
  {
    n: '02',
    title: 'Tus clientes no pueden encontrarte',
    body: 'Tu web puede ser una maravilla — si nadie llega a ella, da igual. Cada búsqueda que pierdes es un cliente que ya está pidiendo cita en otro sitio.',
    span: 'small',
    tag: 'Tráfico bloqueado'
  },
  {
    n: '03',
    title: 'Pagas publicidad porque el SEO no funciona',
    body: 'Google Ads te da un parche caro. Cuando paras de pagar, paras de existir. El SEO bien hecho es un activo: lo construyes una vez y trabaja para ti todos los meses.',
    span: 'small',
    tag: 'Coste por click'
  }
]

const reveal = {
  hidden: { opacity: 0, y: 60 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.9, ease: [0.16, 1, 0.3, 1] }
  })
}

export default function Problem() {
  return (
    <section className={styles.section} id="problema" aria-label="El problema">
      <div className={`container ${styles.container}`}>
        <motion.div
          className={styles.head}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">/ El problema · 001</span>
          <h2 className={styles.title}>
            Cada día <em>invisible</em>
            <br /> en Google es <span className={styles.titleAccent}>dinero que pierdes.</span>
          </h2>
          <p className={styles.lede}>
            No es teoría. Es la diferencia entre llenar la agenda esta semana
            o ver pasar a tus clientes hacia el negocio de al lado.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {cards.map((c, i) => (
            <motion.article
              key={c.n}
              className={`${styles.card} ${styles[c.span]}`}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10%' }}
              custom={i}
              data-cursor
            >
              <div className={styles.cardHead}>
                <span className={styles.num}>{c.n}</span>
                <span className={styles.tag}>{c.tag}</span>
              </div>
              <h3 className={styles.cardTitle}>{c.title}</h3>
              <p className={styles.cardBody}>{c.body}</p>
              <div className={styles.line} aria-hidden="true" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
